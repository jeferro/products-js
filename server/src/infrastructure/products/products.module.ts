import { DynamicModule, Module } from '@nestjs/common'
import { ProductsRestController } from './adapters/rest/ProductsRestController'
import { ProductsRepository } from 'src/domain/products/repositories/ProductsRepository'
import { ProductsMongoRepository } from './adapters/mongo/ProductsMongoRepository'
import { UpsertProductHandler } from 'src/application/products/UpsertProductHandler'
import { GetProductHandler } from 'src/application/products/GetProductHandler'
import { ChangeProductActivationHandler } from 'src/application/products/ChangeProductActivationHandler'
import { DeleteProductHandler } from 'src/application/products/DeleteProductHandler'
import { ListProductsHandler } from 'src/application/products/ListProductsHandler'
import { ProductsConfiguration } from './ProductsConfiguration'
import { ProductsStream } from 'src/domain/products/streams/ProductsStream'
import { ProductsKafkaStream } from './adapters/kafka/ProductsKafkaStream'
import { ProductsKafkaConsumer } from './adapters/kafka/ProductsKafkaConsumer'
import { SaveProductEventHandler } from './handlers/SaveProductEventHandler'


@Module({})
export class ProductsModule {

  static forRoot(config: ProductsConfiguration): DynamicModule {
    return {
      module: ProductsModule,
      providers: [
        {provide: ProductsConfiguration, useValue: config},
    
        { provide: ProductsRepository, useClass: ProductsMongoRepository },
        { provide: ProductsStream, useClass: ProductsKafkaStream },

        UpsertProductHandler,
        GetProductHandler,
        ChangeProductActivationHandler,
        DeleteProductHandler,
        ListProductsHandler,

        SaveProductEventHandler,
        
        ProductsKafkaConsumer,
      ],
      controllers: [
        ProductsRestController
      ]
    }
  }
}
