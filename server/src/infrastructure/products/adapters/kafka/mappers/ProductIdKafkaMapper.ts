import { ProductId } from "src/domain/products/entities/ProductId"
import { BidireccionalMapper } from "jf-architecture"


export class ProductIdKafkaMapper extends BidireccionalMapper<ProductId, string> {
    
    protected _toEntity(dto: string): ProductId {
        return new ProductId(dto)
    }
    
    protected _toDTO(entity: ProductId): string {
        return entity.value
    }
    
}