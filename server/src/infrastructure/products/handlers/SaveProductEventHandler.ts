import { BaseCommandHandler, CommandHandler, LoggerCreator } from 'jf-architecture'
import { SaveProductEvent } from './command/SaveProductEvent'
import { ProductCreatedMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductCreatedMongoDTO'
import { ProductCreatedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO'
import { ProductUpdatedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO'
import { ProductDeletedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO '
import { ProductEventKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductEventKafkaDTO'
import { ProductEventMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductEventMongoDTO'
import { ProductEventsMongoClient } from 'src/infrastructure-components/mongo/products/ProductEventsMongoClient'
import { Product } from 'src/domain/products/entities/Product'
import { ProductUpdatedMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductUpdatedMongoDTO'
import { ProductDeletedMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductDeletedMongoDTO'
import {
  ProductActivationChangedKafkaDTO,
} from 'src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO'
import {
  ProductActivationChangedMongoDTO,
} from 'src/infrastructure-components/mongo/products/dtos/events/ProductActivationChangedMongoDTO'

@CommandHandler(SaveProductEvent)
export class SaveProductEventHandler extends BaseCommandHandler<SaveProductEvent, ProductEventMongoDTO> {
  
  constructor(
    loggerCreator: LoggerCreator,
    private readonly productEventsMongoClient: ProductEventsMongoClient,
  ) {
    super(Product, loggerCreator)
  }

  protected async handle(params: SaveProductEvent): Promise<ProductEventMongoDTO> {
    const productEventMongo = this.convertEvent(params.event)

    await this.productEventsMongoClient.save(productEventMongo)

    return productEventMongo
  }

  private convertEvent(productEventKafka: ProductEventKafkaDTO): ProductEventMongoDTO {
    const id = `${productEventKafka.productId}::${productEventKafka.ocurredOn.toISOString()}`

    if (productEventKafka instanceof ProductCreatedKafkaDTO) {
      return new ProductCreatedMongoDTO(
        id,
        productEventKafka.ocurredOn,
        productEventKafka.ocurredBy,
        productEventKafka.productId,
        productEventKafka.title,
        productEventKafka.description,
        productEventKafka.enabled
      )
    }

    if (productEventKafka instanceof ProductUpdatedKafkaDTO) {
      return new ProductUpdatedMongoDTO(
        id,
        productEventKafka.ocurredOn,
        productEventKafka.ocurredBy,
        productEventKafka.productId,
        productEventKafka.title,
        productEventKafka.description
      )
    }

    if (productEventKafka instanceof ProductActivationChangedKafkaDTO) {
      return new ProductActivationChangedMongoDTO(
        id,
        productEventKafka.ocurredOn,
        productEventKafka.ocurredBy,
        productEventKafka.productId,
        productEventKafka.enabled
      )
    }

    if (productEventKafka instanceof ProductDeletedKafkaDTO) {
      return new ProductDeletedMongoDTO(
        id,
        productEventKafka.ocurredOn,
        productEventKafka.ocurredBy,
        productEventKafka.productId
      )
    }

    throw new Error('Unknown type of product event')
  }
}
