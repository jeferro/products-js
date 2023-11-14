import { KafkaDTO } from 'jf-nestjs-kafka'

export class ProductEventKafkaDTO extends KafkaDTO {

    constructor(
        ocurredOn: Date,
        readonly ocurredBy: string,
        readonly productId: string
    ) {
        super(ocurredOn)
    }
}