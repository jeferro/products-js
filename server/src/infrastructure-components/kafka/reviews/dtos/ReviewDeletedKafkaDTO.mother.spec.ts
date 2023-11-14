import { ReviewDeletedKafkaDTO } from "./ReviewDeletedKafkaDTO"

export class ReviewDeletedKafkaDTOMother {

    static one(): ReviewDeletedKafkaDTO {
        const ocurredOn = new Date()
        const userId = 'one-user'
        const productId = 'one-product'
        const reviewId = `${userId}:${productId}`

        return new ReviewDeletedKafkaDTO(
            ocurredOn,
            reviewId,
            userId,
            productId,
            'comment of the product'
        )
    }
}
