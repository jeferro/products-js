import { INestApplication, Type } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { KafkaContainer, StartedKafkaContainer } from "@testcontainers/kafka"
import { KafkaConfiguration, KafkaClient, KafkaDTO } from "jf-nestjs-kafka"
import { KafkaComponentModule } from "src/infrastructure-components/kafka/kafka-component.module"

export class KafkaConsumerTestBootstraper {

  private readonly KAFKA_PORT = 9093

  private kafkaContainer: StartedKafkaContainer | undefined

  private kafkaClient: KafkaClient | undefined

  private app: INestApplication<any> | undefined

  async start(
    providerType: Type<any>
  ): Promise<any> {
    const kafkaContainer = await this.startKafka()

    const kafkaConfig = this.generateKafkaConnection(kafkaContainer)

    return await this.startApplication(
      kafkaConfig,
      providerType
    )
  }

  async stop() {
    await this.app?.close()

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

  private async startApplication(
    kafkaConfig: KafkaConfiguration,
    providerType: Type<any>
  ): Promise<void> {
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

    this.kafkaClient = this.app.get(KafkaClient)

    return this.app.get(providerType)
  }

  async sendEnvelope(
    topic: string,
    payload: KafkaDTO,
    key: string | undefined,
  ): Promise<void> {
    if (!this.kafkaClient) {
      throw new Error('Kafka client should be started')
    }

    this.kafkaClient.sendEnvelope(
      topic,
      payload,
      key
    )
  }
}