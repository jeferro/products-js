import { Injectable } from "@nestjs/common"
import { BaseKafkaProducer, KafkaClient } from "jf-nestjs-kafka"
import { ProductEventKafkaDTO } from "./dtos/ProductEventKafkaDTO"


@Injectable()
export class ProductsKafkaProducer extends BaseKafkaProducer {

    constructor(
        private readonly kafkaClient: KafkaClient,
    ) {
        super()
    }

    async publish(
        topic: string,
        event: ProductEventKafkaDTO
    ): Promise<void> {
        return this.kafkaClient.sendEnvelope(
            topic,
            event,
            event.productId
        )
    }
}