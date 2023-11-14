import { ProductId } from 'src/domain/products/entities/ProductId'
import { ElementNotFoundException } from 'jf-architecture'


export class ProductDetailNotFoundException extends ElementNotFoundException {

  static of(productId: ProductId): ProductDetailNotFoundException {
    return new ProductDetailNotFoundException(`Product detail '${productId}' not found`)
  }
}
