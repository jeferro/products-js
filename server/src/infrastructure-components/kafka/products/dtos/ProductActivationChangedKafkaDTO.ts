import { ProductEventKafkaDTO } from "./ProductEventKafkaDTO"

export class ProductActivationChangedKafkaDTO extends ProductEventKafkaDTO {
    
    constructor(
        ocurredOn: Date,
        ocurredBy: string,
        productId: string,
        readonly enabled: boolean
    ) {
        super(
            ocurredOn,
            ocurredBy,
            productId
        )
    }
}