import { ProductsKafkaProducer } from "src/infrastructure-components/kafka/products/ProductsKafkaProducer"
import { ProductCreated } from "src/domain/products/events/ProductCreated"
import { ProductDeleted } from "src/domain/products/events/ProductDeleted"
import { ProductUpdated } from "src/domain/products/events/ProductUpdated"
import { ProductsStream } from "src/domain/products/streams/ProductsStream"
import { ProductsConfiguration } from "../../ProductsConfiguration"
import { Injectable } from "@nestjs/common"
import { ProductCreatedKafkaMapper } from "./mappers/ProductCreatedKafkaMapper"
import { ProductUpdatedKafkaMapper } from "./mappers/ProductUpdatedKafkaMapper"
import { ProductDeletedKafkaMapper } from "./mappers/ProductDeletedKafkaMapper"
import { ProductActivationChangedKafkaMapper } from "./mappers/ProductActivationChangedKafkaMapper"
import { ProductActivationChanged } from "src/domain/products/events/ProductActivationChanged"

@Injectable()
export class ProductsKafkaStream extends ProductsStream {

    private readonly productCreatedKafkaMapper = new ProductCreatedKafkaMapper()

    private readonly productUpdatedKafkaMapper = new ProductUpdatedKafkaMapper()

    private readonly productActivationChangedKafkaMapper = new ProductActivationChangedKafkaMapper()

    private readonly productDeletedKafkaMapper = new ProductDeletedKafkaMapper()

    constructor(
        private readonly productsConfig: ProductsConfiguration,
        private readonly productsKafkaProducer: ProductsKafkaProducer
    ) {
        super()
    }

    protected async publishCreated(event: ProductCreated): Promise<void> {
        await this.productsKafkaProducer.publish(
            this.productsConfig.topic,
            this.productCreatedKafkaMapper.toDTO(event)
        )
    }

    protected async publishUpdated(event: ProductUpdated): Promise<void> {
        await this.productsKafkaProducer.publish(
            this.productsConfig.topic,
            this.productUpdatedKafkaMapper.toDTO(event)
        )
    }

    protected async publishProductActivationChanged(event: ProductActivationChanged): Promise<void> {
        await this.productsKafkaProducer.publish(
            this.productsConfig.topic,
            this.productActivationChangedKafkaMapper.toDTO(event)
        )
    }

    protected async publishDeleted(event: ProductDeleted): Promise<void> {
        await this.productsKafkaProducer.publish(
            this.productsConfig.topic,
            this.productDeletedKafkaMapper.toDTO(event)
        )
    }

}