import { ProductEventKafkaDTO } from "./ProductEventKafkaDTO"

export class ProductUpdatedKafkaDTO extends ProductEventKafkaDTO {
    
    constructor(
        ocurredOn: Date,
        ocurredBy: string,
        productId: string,
        readonly title: string,
        readonly description: string
    ) {
        super(
            ocurredOn,
            ocurredBy,
            productId
        )
    }
}