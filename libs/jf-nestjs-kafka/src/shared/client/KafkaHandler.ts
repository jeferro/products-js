import { Consumer, EachMessagePayload, Kafka } from "kafkajs"
import { BaseKafkaConsumer } from "../consumers/BaseKafkaConsumer"
import { Logger } from "@nestjs/common"
import { MetadataKafkaDTO } from "../dtos/MetadataKafkaDTO"
import { EnvelopeKafkaDTO } from "../dtos/EnvelopeKafkaDTO"
import { plainToInstance } from "class-transformer"
import { KafkaConverter } from "../converters/KafkaConverter"

export class KafkaHandler {
    private readonly logger = new Logger(KafkaHandler.name)

    private readonly kafkaConsumerByTopic = new Map<string, BaseKafkaConsumer>()

    private consumer: Consumer | undefined

    constructor(
        private readonly groupId: string,
        private readonly kafka: Kafka,
        private readonly converter: KafkaConverter,
    ) { }

    static of(
        groupId: string,
        kafka: Kafka,
        converter: KafkaConverter,
    ): KafkaHandler {
        return new KafkaHandler(
            groupId,
            kafka,
            converter
        )
    }

    registryConsumer(kafkaConsumer: BaseKafkaConsumer){
        if(this.kafkaConsumerByTopic.has(kafkaConsumer.topic)){
            throw new Error(`There is already one consumer by topic ${kafkaConsumer.topic} in group id ${this.groupId}`)
        }

        this.kafkaConsumerByTopic.set(kafkaConsumer.topic, kafkaConsumer)
    }

    async connect(): Promise<void> {
        this.consumer = this.kafka.consumer({
            groupId: this.groupId
        })

        await this.consumer.connect()

        const topics = Array.from(this.kafkaConsumerByTopic.keys())

        await this.consumer.subscribe({
            topics: topics
        })

        await this.consumer.run({
            eachMessage: async (payload: EachMessagePayload) => await this.onEachMessage(payload)
        })
    }

    async disconnect(): Promise<void> {
        await this.consumer?.disconnect()
    }

    private async onEachMessage(messagePayload: EachMessagePayload): Promise<void> {
        try {
            const value = messagePayload.message.value
            const topic = messagePayload.topic
            
            if (!value) {
                this.logger.warn('Ignore empty message')
                return
            }

            const kafkaConsumer = this.kafkaConsumerByTopic.get(topic)

            if (!kafkaConsumer) {
                this.logger.error(`Consumer of topic ${topic} not found`)
                return
            }

            const envelopeRaw = this.converter.deserialize(value)

            const eventClass = kafkaConsumer.getEventClassFromName(envelopeRaw.metadata.type)

            if(!eventClass){
                return;
            }

            const metadata = plainToInstance(
                MetadataKafkaDTO, 
                envelopeRaw.metadata
            )

            const payload = plainToInstance(
                eventClass, 
                envelopeRaw.payload
            )

            const envelope = new EnvelopeKafkaDTO(
                metadata,
                payload
            )

            await kafkaConsumer.consume(envelope)
        }
        catch (cause) {
            this.logger.error(cause.message, cause.stack)
        }
    }
}