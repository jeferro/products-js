import { ProductActivationChangedKafkaDTO } from "./ProductActivationChangedKafkaDTO"

export class ProductActivationChangedKafkaDTOMother {

    static one(): ProductActivationChangedKafkaDTO {
        const ocurredOn = new Date()
        const ocurredBy = 'one-user'
        const productId = 'one-product'

        return new ProductActivationChangedKafkaDTO(
            ocurredOn,
            ocurredBy,
            productId,
            true
        )
    }
}
