import { DynamicModule, Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductMongoDTO, ProductMongoDTOSchema } from './products/dtos/products/ProductMongoDTO'
import { ProductsMongoClient } from './products/ProductsMongoClient'
import { UserMongoDTO, UserMongoDTOSchema } from './auth/dtos/UserMongoDTO'
import { UsersMongoClient } from './auth/UsersMongoClient'
import { MongoConfiguration } from './MongoConfiguration'
import { ProductEventMongoDTO, ProductEventMongoDTOSchema } from './products/dtos/events/ProductEventMongoDTO'
import { ProductEventsMongoClient } from './products/ProductEventsMongoClient'
import { ProductDetailMongoDTO, ProductDetailMongoDTOSchema } from './product-details/dtos/ProductDetailMongoDTO'
import { ProductDetailsMongoClient } from './product-details/ProductDetailsMongoClient'

@Global()
@Module({})
export class MongoComponentModule {
  
  static forRoot(config: MongoConfiguration): DynamicModule {
    return {
      module: MongoComponentModule,
      imports: [
        MongooseModule.forRoot(config.uri),
        MongooseModule.forFeature([
          { name: UserMongoDTO.name, schema: UserMongoDTOSchema },

          { name: ProductMongoDTO.name, schema: ProductMongoDTOSchema },
          { name: ProductEventMongoDTO.name, schema: ProductEventMongoDTOSchema },

          { name: ProductDetailMongoDTO.name, schema: ProductDetailMongoDTOSchema },
        ]),
      ],
      providers: [
        UsersMongoClient,

        ProductsMongoClient,
        ProductEventsMongoClient,

        ProductDetailsMongoClient
      ],
      exports: [
        UsersMongoClient,
        
        ProductsMongoClient,
        ProductEventsMongoClient,

        ProductDetailsMongoClient
      ],
    }
  }
}
