import { ProductUpdatedKafkaDTO } from "./ProductUpdatedKafkaDTO"

export class ProductUpdatedKafkaDTOMother {

    static one(): ProductUpdatedKafkaDTO {
        const ocurredOn = new Date()
        const ocurredBy = 'one-user'
        const productId = 'one-product'

        return new ProductUpdatedKafkaDTO(
            ocurredOn,
            ocurredBy,
            productId,
            'title of product one',
            'description of product one'
        )
    }
}
