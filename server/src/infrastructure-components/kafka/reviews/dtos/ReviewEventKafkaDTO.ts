import { KafkaDTO } from "jf-nestjs-kafka"


export abstract class ReviewEventKafkaDTO extends KafkaDTO {

    constructor(
        ocurredOn: Date,
        readonly reviewId: string,
        readonly productId: string,
        readonly ownerId: string,
        readonly comment: string
    ) {
        super(
            ocurredOn,
        )
    }
}