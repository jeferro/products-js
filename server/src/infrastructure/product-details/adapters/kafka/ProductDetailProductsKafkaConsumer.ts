import { ProductsKafkaConsumerSpec } from "src/infrastructure-components/kafka/products/ProductsKafkaConsumerSpec"
import { ProductCreatedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO"
import { ProductUpdatedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO"
import { Injectable } from "@nestjs/common"
import { EnvelopeKafkaDTO } from "jf-nestjs-kafka"
import { SystemAuth, CommandBus } from "jf-architecture"
import { ProductDeletedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO "
import { ProductDetailsConfiguration } from "../../ProductDetailsConfiguration"
import { UpsertProductDetail } from "../../handlers/commands/UpsertProductDetail"
import { DeleteProductDetail } from "../../handlers/commands/DeleteProductDetail"
import { ProductIdKafkaMapper } from "src/infrastructure/products/adapters/kafka/mappers/ProductIdKafkaMapper"
import { ProductActivationChangedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO"
import { ChangeProductDetailActivation } from "../../handlers/commands/ChangeActivationProductDetail"

@Injectable()
export class ProductDetailsProductsKafkaConsumer extends ProductsKafkaConsumerSpec {   
    
    private readonly auth = SystemAuth.of()

    private readonly productIdKakfaMapper = new ProductIdKafkaMapper()

    constructor(
        private readonly productDetailsConfig: ProductDetailsConfiguration,
        private readonly commandBus: CommandBus,
    ) {
        super()
    }
    
    get topic(): string {
        return this.productDetailsConfig.productsTopic
    }

    get groupId(): string {
        return this.productDetailsConfig.groupId
    }

    async onProductCreated(envelope: EnvelopeKafkaDTO<ProductCreatedKafkaDTO>): Promise<void> {
        const event = envelope.payload

        const command = new UpsertProductDetail(
            this.auth,
            this.productIdKakfaMapper.toEntity(event.productId),
            event.title,
            event.description,
            event.enabled,
            event.ocurredOn
        )

        await this.commandBus.execute(command)
    }

    async onProductUpdated(envelope: EnvelopeKafkaDTO<ProductUpdatedKafkaDTO>): Promise<void> {
        const event = envelope.payload

        const command = new UpsertProductDetail(
            this.auth,
            this.productIdKakfaMapper.toEntity(event.productId),
            event.title,
            event.description,
            undefined,
            event.ocurredOn
        )

        await this.commandBus.execute(command)
    }

    async onProductActivationChanged(envelope: EnvelopeKafkaDTO<ProductActivationChangedKafkaDTO>): Promise<void> {
        const event = envelope.payload

        const command = new ChangeProductDetailActivation(
            this.auth,
            this.productIdKakfaMapper.toEntity(event.productId),
            event.enabled,
            event.ocurredOn
        )

        await this.commandBus.execute(command)
    }

    async onProductDeleted(envelope: EnvelopeKafkaDTO<ProductDeletedKafkaDTO>): Promise<void> {
        const command = new DeleteProductDetail(
            this.auth,
            this.productIdKakfaMapper.toEntity(envelope.payload.productId)
        )

        await this.commandBus.execute(command)
    }
}