import { ProductsKafkaConsumerSpec } from "src/infrastructure-components/kafka/products/ProductsKafkaConsumerSpec"
import { ProductCreatedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO"
import { ProductUpdatedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO"
import { ProductsConfiguration } from "../../ProductsConfiguration"
import { Injectable } from "@nestjs/common"
import { EnvelopeKafkaDTO } from "jf-nestjs-kafka"
import { SaveProductEvent } from "../../handlers/command/SaveProductEvent"
import { SystemAuth, CommandBus } from "jf-architecture"
import { ProductDeletedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO "
import { ProductEventKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductEventKafkaDTO"
import { ProductActivationChangedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO"

@Injectable()
export class ProductsKafkaConsumer extends ProductsKafkaConsumerSpec {   
    
    private readonly auth = SystemAuth.of()

    constructor(
        private readonly productsConfig: ProductsConfiguration,
        private readonly commandBus: CommandBus,
    ) {
        super()
    }
    
    get topic(): string {
        return this.productsConfig.topic
    }

    get groupId(): string {
        return this.productsConfig.groupId
    }

    async onProductCreated(envelop: EnvelopeKafkaDTO<ProductCreatedKafkaDTO>): Promise<void> {
        this.saveProductEvent(envelop)
    }

    async onProductUpdated(envelop: EnvelopeKafkaDTO<ProductUpdatedKafkaDTO>): Promise<void> {
        this.saveProductEvent(envelop)
    }

    async onProductActivationChanged(envelop: EnvelopeKafkaDTO<ProductActivationChangedKafkaDTO>): Promise<void> {
        this.saveProductEvent(envelop)
    }

    async onProductDeleted(envelop: EnvelopeKafkaDTO<ProductDeletedKafkaDTO>): Promise<void> {
        this.saveProductEvent(envelop)
    }

    private async saveProductEvent(envelop: EnvelopeKafkaDTO<ProductEventKafkaDTO>): Promise<void> {
        const command = new SaveProductEvent(
            this.auth,
            envelop.payload
        )

        await this.commandBus.execute(command)
    }
}