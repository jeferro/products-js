import { ProductId } from 'src/domain/products/entities/ProductId'
import { BidireccionalMapper } from 'jf-architecture'

export class ProductIdRestMapper extends BidireccionalMapper<ProductId, string> {
  
  protected _toEntity(productIdDTO: string): ProductId {
    return new ProductId(productIdDTO)
  }

  protected _toDTO(productId: ProductId): string {
    return productId.value
  }
}
