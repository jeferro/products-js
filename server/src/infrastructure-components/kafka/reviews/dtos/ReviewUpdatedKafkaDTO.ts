import { ReviewEventKafkaDTO } from "./ReviewEventKafkaDTO"

export class ReviewUpdatedKafkaDTO extends ReviewEventKafkaDTO {

    constructor(
        ocurredOn: Date,
        reviewId: string,
        productId: string,
        ownerId: string,
        comment: string
    ) {
        super(
            ocurredOn,
            reviewId,
            productId,
            ownerId,
            comment
        )
    }
}