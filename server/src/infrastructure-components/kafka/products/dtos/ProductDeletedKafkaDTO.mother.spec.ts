import { ProductDeletedKafkaDTO } from "./ProductDeletedKafkaDTO "

export class ProductDeletedKafkaDTOMother {

    static one(): ProductDeletedKafkaDTO {
        const ocurredOn = new Date()
        const ocurredBy = 'one-user'
        const productId = 'one-product'

        return new ProductDeletedKafkaDTO(
            ocurredOn,
            ocurredBy,
            productId
        )
    }
}
