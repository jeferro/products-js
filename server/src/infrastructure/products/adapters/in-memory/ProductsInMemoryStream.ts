import { ProductActivationChanged } from "src/domain/products/events/ProductActivationChanged"
import { ProductCreated } from "src/domain/products/events/ProductCreated"
import { ProductDeleted } from "src/domain/products/events/ProductDeleted"
import { ProductUpdated } from "src/domain/products/events/ProductUpdated"
import { ProductsStream } from "src/domain/products/streams/ProductsStream"
import { DomainEvent } from "jf-architecture"

export class ProductsInMemoryStream extends ProductsStream {

    events: DomainEvent[] = []

    public reset() {
        this.events = []
    }

    public shift(): DomainEvent | undefined {
        return this.events.shift()
    }

    protected async publishCreated(event: ProductCreated): Promise<void> {
        this.events.push(event)
    }

    protected async publishUpdated(event: ProductUpdated): Promise<void> {
        this.events.push(event)
    }

    protected async publishProductActivationChanged(event: ProductActivationChanged): Promise<void> {
        this.events.push(event)
    }

    protected async publishDeleted(event: ProductDeleted): Promise<void> {
        this.events.push(event)
    }
    
}