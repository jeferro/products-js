import { ProductEventKafkaDTO } from "./ProductEventKafkaDTO"

export class ProductDeletedKafkaDTO extends ProductEventKafkaDTO {
    
    constructor(
        ocurredOn: Date,
        ocurredBy: string,
        productId: string,
    ) {
        super(
            ocurredOn,
            ocurredBy,
            productId
        )
    }
}