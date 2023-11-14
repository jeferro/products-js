import { ProductCreatedKafkaDTO } from "./ProductCreatedKafkaDTO"

export class ProductCreatedKafkaDTOMother {

    static one(): ProductCreatedKafkaDTO {
        const ocurredOn = new Date()
        const ocurredBy = 'one-user'
        const productId = 'one-product'

        return new ProductCreatedKafkaDTO(
            ocurredOn,
            ocurredBy,
            productId,
            'title of product one',
            'description of product one',
            true
        )
    }
}
