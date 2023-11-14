import { Injectable } from "@nestjs/common"
import { BaseKafkaProducer, KafkaClient } from "jf-nestjs-kafka"
import { ReviewEventKafkaDTO } from "./dtos/ReviewEventKafkaDTO"


@Injectable()
export class ReviewsKafkaProducer extends BaseKafkaProducer {

    constructor(
        private readonly kafkaClient: KafkaClient,
    ) {
        super()
    }

    async publish(
        topic: string,
        event: ReviewEventKafkaDTO
    ): Promise<void> {
        return this.kafkaClient.sendEnvelope(
            topic,
            event,
            event.reviewId
        )
    }
}