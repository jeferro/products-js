import { Stream, DomainEvent } from "jf-architecture"
import { Product } from "../entities/Product"
import { ProductCreated } from "../events/ProductCreated"
import { ProductUpdated } from "../events/ProductUpdated"
import { ProductDeleted } from "../events/ProductDeleted"
import { ProductActivationChanged } from "../events/ProductActivationChanged"

export abstract class ProductsStream extends Stream<Product> {

    publishEach(event: DomainEvent): Promise<void> {
        if(event instanceof ProductCreated){
            return this.publishCreated(event)
        }

        if(event instanceof ProductUpdated){
            return this.publishUpdated(event)
        }

        if(event instanceof ProductActivationChanged){
            return this.publishProductActivationChanged(event)
        }

        if(event instanceof ProductDeleted){
            return this.publishDeleted(event)
        }

        throw new Error('Unknown type of event')
    }

    protected abstract publishCreated(event: ProductCreated): Promise<void>

    protected abstract publishUpdated(event: ProductUpdated): Promise<void>

    protected abstract publishProductActivationChanged(event: ProductActivationChanged): Promise<void>

    protected abstract publishDeleted(event: ProductDeleted): Promise<void>
}