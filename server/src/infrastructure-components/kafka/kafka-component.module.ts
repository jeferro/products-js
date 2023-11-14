import { DynamicModule, Global, Module } from '@nestjs/common'
import { KafkaNestjsModule, KafkaConfiguration } from 'jf-nestjs-kafka'
import { ProductsKafkaProducer } from './products/ProductsKafkaProducer'

@Global()
@Module({})
export class KafkaComponentModule {
  
  static forRoot(config: KafkaConfiguration): DynamicModule {
    return {
      module: KafkaComponentModule,
      imports: [
        KafkaNestjsModule.forRoot(config),
      ],
      providers: [
        ProductsKafkaProducer
      ],
      exports: [
        ProductsKafkaProducer
      ],
    }
  }
}
