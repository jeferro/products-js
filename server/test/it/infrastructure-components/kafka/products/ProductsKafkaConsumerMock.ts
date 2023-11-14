import { ProductsKafkaConsumerSpec } from "src/infrastructure-components/kafka/products/ProductsKafkaConsumerSpec"
import { ProductCreatedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO"
import { ProductDeletedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO "
import { ProductUpdatedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO"
import { EnvelopeKafkaDTO } from "jf-nestjs-kafka"
import { BlockResult } from "../BlockResult"
import { ProductEventKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductEventKafkaDTO"
import { ProductActivationChangedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO"

export class ProductsKafkaConsumerMock extends ProductsKafkaConsumerSpec {
   
    static readonly TOPIC = 'products-topic'

    readonly blockResult = new BlockResult<EnvelopeKafkaDTO<ProductEventKafkaDTO>>()

    get topic(): string {
        return ProductsKafkaConsumerMock.TOPIC
    }

    get groupId(): string {
        return 'products-group'
    }

    async onProductCreated(envelop: EnvelopeKafkaDTO<ProductCreatedKafkaDTO>): Promise<void> {
        this.blockResult.push(envelop)
    }

    async onProductUpdated(envelop: EnvelopeKafkaDTO<ProductUpdatedKafkaDTO>): Promise<void> {
        this.blockResult.push(envelop)
    }

    async onProductActivationChanged(envelop: EnvelopeKafkaDTO<ProductActivationChangedKafkaDTO>): Promise<void> {
        this.blockResult.push(envelop)
    }

    async onProductDeleted(envelop: EnvelopeKafkaDTO<ProductDeletedKafkaDTO>): Promise<void> {
        this.blockResult.push(envelop)
    }
    
}