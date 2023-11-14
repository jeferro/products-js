import { SimpleValue } from 'jf-architecture'

export class ProductId extends SimpleValue<string> {
    
    static of(value: string): ProductId {
        return new ProductId(value)
    }
}
