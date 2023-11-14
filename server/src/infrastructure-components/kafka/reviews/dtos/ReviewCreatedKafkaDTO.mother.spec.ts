import { ReviewCreatedKafkaDTO } from "./ReviewCreatedKafkaDTO"

export class ReviewCreatedKafkaDTOMother {

    static one(): ReviewCreatedKafkaDTO {
        const ocurredOn = new Date()
        const userId = 'one-user'
        const productId = 'one-product'
        const reviewId = `${userId}:${productId}`

        return new ReviewCreatedKafkaDTO(
            ocurredOn,
            reviewId,
            userId,
            productId,
            'comment of the product'
        )
    }
}
