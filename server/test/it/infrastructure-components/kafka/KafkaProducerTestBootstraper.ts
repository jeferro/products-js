import { INestApplication, Type } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { KafkaContainer, StartedKafkaContainer } from "@testcontainers/kafka"
import { Consumer, EachMessagePayload, Kafka, logLevel } from "kafkajs"
import { KafkaConfiguration } from "jf-nestjs-kafka"
import { KafkaComponentModule } from "src/infrastructure-components/kafka/kafka-component.module"
import { ThreadUtils } from "jf-architecture"

export class KafkaProducerTestBootstraper {

  private readonly KAFKA_PORT = 9093

  private messages: Record<string, any>[] = []

  private kafkaContainer: StartedKafkaContainer | undefined

  private kafkaConsumer: Consumer | undefined

  private app: INestApplication<any> | undefined

  async start(
    providerType: Type<any>,
    topic: string,
  ): Promise<any> {
    const kafkaContainer = await this.startKafka()

    const kafkaConfig = this.generateKafkaConnection(kafkaContainer)

    await this.startKafkaConsumer(
      kafkaConfig,
      topic
    )

    return await this.startApplication(
      kafkaConfig,
      providerType
    )
  }

  async stop() {
    await this.app?.close()

    await this.kafkaConsumer?.disconnect()

    await this.kafkaContainer?.stop()
  }

  private async startKafka(): Promise<StartedKafkaContainer> {
    this.kafkaContainer = await new KafkaContainer("confluentinc/cp-kafka:7.3.2")
      .withExposedPorts(this.KAFKA_PORT)
      .start()

    return this.kafkaContainer
  }

  private generateKafkaConnection(kafkaContainer: StartedKafkaContainer): KafkaConfiguration {
    const host = kafkaContainer.getHost()
    const port = kafkaContainer.getMappedPort(this.KAFKA_PORT)

    return KafkaConfiguration.of(
      'test-client-id',
      [`${host}:${port}`],
    )
  }

  private async startKafkaConsumer(
    kafkaConfig: KafkaConfiguration,
    topic: string
  ): Promise<void> {
    const kafka = new Kafka({
      logLevel: logLevel.NOTHING,
      brokers: kafkaConfig.brokers
    })

    this.kafkaConsumer = kafka.consumer({ groupId: "test-group" })
    await this.kafkaConsumer.connect()

    this.kafkaConsumer.subscribe({
      topic: topic
    })

    await this.kafkaConsumer.run({
      eachMessage: async (payload: EachMessagePayload) => this.onEachMessage(payload)
    })
  }

  private async startApplication(
    kafkaConfig: KafkaConfiguration,
    providerType: Type<any>
  ): Promise<any> {
    const moduleRef = await Test.createTestingModule({
      imports: [
        KafkaComponentModule.forRoot(kafkaConfig),
      ],
      providers: [
        providerType
      ]
    }).compile()

    this.app = await moduleRef.createNestApplication()
      .init()

    return this.app.get(providerType)
  }

  private onEachMessage(payload: EachMessagePayload) {
    const value = payload.message.value
      ? JSON.parse(payload.message.value.toString())
      : undefined

    if (!value) {
      console.warn('Read undefined value from topic')
      return
    }

    this.messages.push(value)
  }

  async waitForEnvelope(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const timeout = setTimeout(
        () => reject('Timeout exceeded'),
        5000
      )

      let message = this.messages.shift()

      while (!message) {
        await ThreadUtils.delay(1000)

        message = this.messages.shift()
      }
      
      clearTimeout(timeout)

      resolve(message)
    })
  }

}