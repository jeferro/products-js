import { INestApplication, Type } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { MongoConfiguration } from 'src/infrastructure-components/mongo/MongoConfiguration'
import { MongoComponentModule } from 'src/infrastructure-components/mongo/mongo-component.module'
import { GenericContainer, StartedTestContainer } from 'testcontainers'


export class MongoRepositoryTestBootstraper {

  private readonly DB_USER = 'test'
  private readonly DB_PASSWORD = 'test'
  private readonly BD_NAME = 'products'

  private mongodbContainer: StartedTestContainer | undefined

  private app: INestApplication<any> | undefined

  async start(
    providerType: Type<any>,
    script: string,
  ): Promise<any> {
    const mongoContainer = await this.startMongo(script)

    const mongoUri = this.generateMongoUri(mongoContainer)

    return await this.startApplication(
      mongoUri,
      providerType
    )
  }

  async stop() {
    await this.app?.close()

    await this.mongodbContainer?.stop()
  }

  private async startMongo(script: string): Promise<StartedTestContainer> {
    this.mongodbContainer = await new GenericContainer("mongo:6.0.1")
      .withEnvironment({
        MONGO_INITDB_ROOT_USERNAME: this.DB_USER,
        MONGO_INITDB_ROOT_PASSWORD: this.DB_PASSWORD,
        MONGO_INITDB_DATABASE: this.BD_NAME
      })
      .withExposedPorts(27017, 27017)
      .withCopyFilesToContainer([{
        source: script,
        target: '/docker-entrypoint-initdb.d/init.js'
      }])
      .start()

    return this.mongodbContainer
  }

  private generateMongoUri(mongodbContainer: StartedTestContainer) {
    const mongodbPort = mongodbContainer.getMappedPort(27017) || 0

    return `mongodb://${this.DB_USER}:${this.DB_PASSWORD}@localhost:${mongodbPort}/${this.BD_NAME}`
      + `?connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1`
  }

  private async startApplication(
    mongoUri: string,
    providerType: Type<any>
  ): Promise<void> {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongoComponentModule.forRoot(
          MongoConfiguration.of(mongoUri)
        )
      ]
    }).compile()

    this.app = await moduleRef.createNestApplication()
      .init()

    return this.app.get(providerType)
  }

}