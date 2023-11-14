import { Kafka, LogEntry, Producer, logLevel } from "kafkajs"
import { KafkaConfiguration } from "../../KafkaConfiguration"
import { Injectable } from "@nestjs/common"
import { KafkaLogger } from "./KafkaLogger"
import { BaseKafkaConsumer } from "../consumers/BaseKafkaConsumer"
import { KafkaConverter } from "../converters/KafkaConverter"
import { MetadataKafkaDTO } from "../dtos/MetadataKafkaDTO"
import { EnvelopeKafkaDTO } from "../dtos/EnvelopeKafkaDTO"
import { KafkaDTO } from "../dtos/KafkaDTO"
import { KafkaHandler } from "./KafkaHandler"

@Injectable()
export class KafkaClient {
    private readonly kafka: Kafka

    private producer: Producer | undefined

    private readonly kafkaHandlerByGroupId = new Map<string, KafkaHandler>()

    constructor(
        config: KafkaConfiguration,
        private readonly converter: KafkaConverter,
    ) {
        const kafkaLogger = new KafkaLogger()

        this.kafka = new Kafka({
            clientId: config.clientId,
            brokers: config.brokers,
            logLevel: logLevel.WARN,
            logCreator: (_: logLevel) => (logEntry: LogEntry) => kafkaLogger.log(logEntry)
        })
    }

    public registryConsumer(kafkaConsumer: BaseKafkaConsumer) {
        const groupId = kafkaConsumer.groupId

        let kafkaHandler = this.kafkaHandlerByGroupId.get(groupId)

        if(!kafkaHandler){
            kafkaHandler = KafkaHandler.of(
                groupId,
                this.kafka,
                this.converter
            )

            this.kafkaHandlerByGroupId.set(groupId, kafkaHandler)
        }

        kafkaHandler.registryConsumer(kafkaConsumer)
    }

    async connect() {
        await this.connectProducer()
        await this.connectConsumers()
    }

    async disconnect() {
        await this.disconnectProducer()
        await this.disconnectConsumers()
    }

    async sendEnvelope(
        topic: string,
        payload: KafkaDTO,
        key: string | undefined,
    ): Promise<void> {
        const now = new Date()

        const metadata = new MetadataKafkaDTO(
            payload.constructor.name,
            now
        )

        const envelop = new EnvelopeKafkaDTO(
            metadata,
            payload
        )

        await this.producer?.send({
            topic: topic,
            messages: [{
                key: key,
                value: this.converter.serialize(envelop)
            }]
        })
    }

    private async connectProducer(): Promise<void> {
        this.producer = this.kafka.producer()

        await this.producer.connect()
    }

    private async disconnectProducer(): Promise<void> {
        await this.producer?.disconnect()
    }

    private async connectConsumers(): Promise<void> {
        for (const kafkaHandler of this.kafkaHandlerByGroupId.values()){
            await kafkaHandler.connect()
        }
    }

    private async disconnectConsumers(): Promise<void> {
        for (const kafkaHandler of this.kafkaHandlerByGroupId.values()){
            await kafkaHandler.disconnect()
        }
    }
}