import { EnvelopeKafkaDTO } from "jf-nestjs-kafka"
import { BlockResult } from "../BlockResult"
import { ReviewsKafkaConsumerSpec } from "src/infrastructure-components/kafka/reviews/ReviewsKafkaConsumerSpec"
import { ReviewDeletedKafkaDTO } from "src/infrastructure-components/kafka/reviews/dtos/ReviewDeletedKafkaDTO"
import { ReviewUpdatedKafkaDTO } from "src/infrastructure-components/kafka/reviews/dtos/ReviewUpdatedKafkaDTO"
import { ReviewCreatedKafkaDTO } from "src/infrastructure-components/kafka/reviews/dtos/ReviewCreatedKafkaDTO"
import { ReviewEventKafkaDTO } from "src/infrastructure-components/kafka/reviews/dtos/ReviewEventKafkaDTO"

export class ReviewsKafkaConsumerMock extends ReviewsKafkaConsumerSpec {
   
    static readonly TOPIC = 'reviews-topic'

    readonly blockResult = new BlockResult<EnvelopeKafkaDTO<ReviewEventKafkaDTO>>()

    get topic(): string {
        return ReviewsKafkaConsumerMock.TOPIC
    }

    get groupId(): string {
        return 'reviews-group'
    }

    async onReviewCreated(envelop: EnvelopeKafkaDTO<ReviewCreatedKafkaDTO>): Promise<void> {
        this.blockResult.push(envelop)
    }

    async onReviewUpdated(envelop: EnvelopeKafkaDTO<ReviewUpdatedKafkaDTO>): Promise<void> {
        this.blockResult.push(envelop)
    }

    async onReviewDeleted(envelop: EnvelopeKafkaDTO<ReviewDeletedKafkaDTO>): Promise<void> {
        this.blockResult.push(envelop)
    }
    
}