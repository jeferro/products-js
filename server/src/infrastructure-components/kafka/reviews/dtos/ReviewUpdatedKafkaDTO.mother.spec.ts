import { ReviewUpdatedKafkaDTO } from "./ReviewUpdatedKafkaDTO"

export class ReviewUpdatedKafkaDTOMother {

    static one(): ReviewUpdatedKafkaDTO {
        const ocurredOn = new Date()
        const userId = 'one-user'
        const productId = 'one-product'
        const reviewId = `${userId}:${productId}`

        return new ReviewUpdatedKafkaDTO(
            ocurredOn,
            reviewId,
            userId,
            productId,
            'comment of the product'
        )
    }
}
