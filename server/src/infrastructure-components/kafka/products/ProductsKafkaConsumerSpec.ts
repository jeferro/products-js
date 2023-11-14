import { Injectable } from "@nestjs/common"
import { ProductCreatedKafkaDTO } from "./dtos/ProductCreatedKafkaDTO"
import { EnvelopeKafkaDTO, BaseKafkaConsumer, KafkaConsumer } from "jf-nestjs-kafka"
import { ProductUpdatedKafkaDTO } from "./dtos/ProductUpdatedKafkaDTO"
import { ProductDeletedKafkaDTO } from "./dtos/ProductDeletedKafkaDTO "
import { ProductActivationChangedKafkaDTO } from "./dtos/ProductActivationChangedKafkaDTO"

@Injectable()
@KafkaConsumer([
    ProductCreatedKafkaDTO,
    ProductUpdatedKafkaDTO,
    ProductActivationChangedKafkaDTO,
    ProductDeletedKafkaDTO
])
export abstract class ProductsKafkaConsumerSpec extends BaseKafkaConsumer {
    
    async consume(envelope: EnvelopeKafkaDTO<any>): Promise<void> {
        if(envelope.payload instanceof ProductCreatedKafkaDTO){
            return this.onProductCreated(envelope)
        }

        if(envelope.payload instanceof ProductUpdatedKafkaDTO){
            return this.onProductUpdated(envelope)
        }

        if(envelope.payload instanceof ProductActivationChangedKafkaDTO){
            return this.onProductActivationChanged(envelope)
        }

        if(envelope.payload instanceof ProductDeletedKafkaDTO){
            return this.onProductDeleted(envelope)
        }

        throw new Error(`Envelope ${envelope.type} not know`)
    }

    abstract onProductCreated(envelope: EnvelopeKafkaDTO<ProductCreatedKafkaDTO>): Promise<void>

    abstract onProductUpdated(envelope: EnvelopeKafkaDTO<ProductUpdatedKafkaDTO>): Promise<void>

    abstract onProductActivationChanged(envelope: EnvelopeKafkaDTO<ProductActivationChangedKafkaDTO>): Promise<void>

    abstract onProductDeleted(envelope: EnvelopeKafkaDTO<ProductDeletedKafkaDTO>): Promise<void>
}