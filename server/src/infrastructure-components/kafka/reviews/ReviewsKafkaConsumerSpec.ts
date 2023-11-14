import { Injectable } from "@nestjs/common"
import { EnvelopeKafkaDTO, BaseKafkaConsumer, KafkaConsumer } from "jf-nestjs-kafka"
import { ReviewCreatedKafkaDTO } from "./dtos/ReviewCreatedKafkaDTO"
import { ReviewUpdatedKafkaDTO } from "./dtos/ReviewUpdatedKafkaDTO"
import { ReviewDeletedKafkaDTO } from "./dtos/ReviewDeletedKafkaDTO"

@Injectable()
@KafkaConsumer([
    ReviewCreatedKafkaDTO,
    ReviewUpdatedKafkaDTO,
    ReviewDeletedKafkaDTO
])
export abstract class ReviewsKafkaConsumerSpec extends BaseKafkaConsumer {
    
    async consume(envelope: EnvelopeKafkaDTO<any>): Promise<void> {
        if(envelope.payload instanceof ReviewCreatedKafkaDTO){
            return this.onReviewCreated(envelope)
        }

        if(envelope.payload instanceof ReviewUpdatedKafkaDTO){
            return this.onReviewUpdated(envelope)
        }

        if(envelope.payload instanceof ReviewDeletedKafkaDTO){
            return this.onReviewDeleted(envelope)
        }

        throw new Error(`Envelope ${envelope.type} not know`)
    }

    abstract onReviewCreated(envelop: EnvelopeKafkaDTO<ReviewCreatedKafkaDTO>): Promise<void>

    abstract onReviewUpdated(envelop: EnvelopeKafkaDTO<ReviewUpdatedKafkaDTO>): Promise<void>

    abstract onReviewDeleted(envelop: EnvelopeKafkaDTO<ReviewDeletedKafkaDTO>): Promise<void>
}