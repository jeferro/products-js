import { DynamicModule, Module } from '@nestjs/common'
import { ProductDetailsConfiguration } from './ProductDetailsConfiguration'
import { ProductDetailsProductsKafkaConsumer } from './adapters/kafka/ProductDetailProductsKafkaConsumer'
import { UpsertProductDetailHandler } from './handlers/UpsertProductDetailHandler'
import { DeleteProductDetailHandler } from './handlers/DeleteProductDetailHandler'
import { ProductDetailsRepository } from './repositories/ProductDetailsRepository'
import { ProductDetailsMongoRepository } from './adapters/mongo/ProductDetailsMongoRepository'
import { ProductDetailsRestController } from './adapters/rest/ProductDetailsRestController'
import { GetProductDetailHandler } from './handlers/GetProductDetailHandler'


@Module({})
export class ProductDetailsModule {

  static forRoot(config: ProductDetailsConfiguration): DynamicModule {
    return {
      module: ProductDetailsModule,
      providers: [
        {provide: ProductDetailsConfiguration, useValue: config},

        {provide: ProductDetailsRepository, useClass: ProductDetailsMongoRepository},
        
        GetProductDetailHandler,
        UpsertProductDetailHandler,
        DeleteProductDetailHandler,
        
        ProductDetailsProductsKafkaConsumer
      ],
      controllers: [
        ProductDetailsRestController
      ]
    }
  }
}
