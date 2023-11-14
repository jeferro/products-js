import { MongoConfiguration } from "src/infrastructure-components/mongo/MongoConfiguration"
import { AuthConfiguration } from "./auth/AuthConfiguration"
import { ProductsConfiguration } from "./products/ProductsConfiguration"
import { RestConfiguration } from "jf-nestjs-rest"
import { KafkaConfiguration } from "jf-nestjs-kafka"
import { ProductDetailsConfiguration } from "./product-details/ProductDetailsConfiguration"
import { YamlProcessor, InfrastructureConfiguration } from "jf-nestjs-architecture"


export class AppConfiguration {
  private static readonly CONFIG_FILE_NAME = 'config.yaml'

  readonly yamlProccesor: YamlProcessor

  readonly components: Components

  readonly modules: Modules

  constructor() {
    this.yamlProccesor = new YamlProcessor(AppConfiguration.CONFIG_FILE_NAME)


    this.components = {
      rest: RestConfiguration.of(
        this.yamlProccesor.get('components.rest.secret'),
        this.yamlProccesor.get('components.rest.expiresIn')
      ),

      mongo: MongoConfiguration.of(
        this.yamlProccesor.get('components.mongo.uri'),
      ),

      kafka: KafkaConfiguration.of(
        this.yamlProccesor.get('components.kafka.clientId'),
        this.yamlProccesor.get('components.kafka.brokers'),
      )
    }


    this.modules = {
      infrastructure: InfrastructureConfiguration.of(
        this.yamlProccesor.get('modules.infrastructure.port'),
        this.yamlProccesor.get('modules.infrastructure.logQueries')
      ),

      auth: AuthConfiguration.of(
        this.yamlProccesor.get('modules.auth.enabled')
      ),

      products: ProductsConfiguration.of(
        this.yamlProccesor.get('modules.products.enabled'),
        this.yamlProccesor.get('modules.products.groupId'),
        this.yamlProccesor.get('modules.products.topic')
      ),

      productDetails: ProductDetailsConfiguration.of(
        this.yamlProccesor.get('modules.productDetails.enabled'),
        this.yamlProccesor.get('modules.productDetails.groupId'),
        this.yamlProccesor.get('modules.productDetails.productsTopic')
      ),
    }
  }
}

interface Components {
  readonly rest: RestConfiguration,
  readonly mongo: MongoConfiguration,
  readonly kafka: KafkaConfiguration,
}

interface Modules {
  readonly infrastructure: InfrastructureConfiguration,
  readonly auth: AuthConfiguration,
  readonly products: ProductsConfiguration
  readonly productDetails: ProductDetailsConfiguration
}
