import { ProductEventKafkaDTO } from "./ProductEventKafkaDTO"

export class ProductCreatedKafkaDTO extends ProductEventKafkaDTO {
    
    constructor(
        ocurredOn: Date,
        ocurredBy: string,
        productId: string,
        readonly title: string,
        readonly description: string,
        readonly enabled: boolean
    ) {
        super(
            ocurredOn,
            ocurredBy,
            productId
        )
    }
}