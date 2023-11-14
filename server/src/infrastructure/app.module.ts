import { DynamicModule, Module } from '@nestjs/common'
import { MongoComponentModule } from 'src/infrastructure-components/mongo/mongo-component.module'
import { AppConfiguration } from './AppConfiguration'
import { InfrastructureModule } from 'jf-nestjs-architecture'
import { AuthModule } from './auth/auth.module'
import { ProductsModule } from './products/products.module'
import { SharedModule } from './shared/shared.module'
import { KafkaComponentModule } from 'src/infrastructure-components/kafka/kafka-component.module'
import { RestComponentModule } from 'src/infrastructure-components/rest/rest-component.module'
import { ProductDetailsModule } from './product-details/product-details.module'

@Module({})
export class AppModule {

  static forRoot(config: AppConfiguration): DynamicModule {
    const enabledContexts = [
      SharedModule.forRoot()
    ]

    if(config.modules.auth.enabled){
      enabledContexts.push(
        AuthModule.forRoot(config.modules.auth)
      )
    }

    if(config.modules.products.enabled){
      enabledContexts.push(
        ProductsModule.forRoot(config.modules.products)
      )
    }

    if(config.modules.productDetails.enabled){
      enabledContexts.push(
        ProductDetailsModule.forRoot(config.modules.productDetails)
      )
    }

    return {
      module: AppModule,
      imports: [
        InfrastructureModule.forRoot(config.modules.infrastructure),

        RestComponentModule.forRoot(config.components.rest),
        KafkaComponentModule.forRoot(config.components.kafka),
        MongoComponentModule.forRoot(config.components.mongo),

        ...enabledContexts,
      ],
    }
  }
}
