import { ElementNotFoundException } from 'jf-architecture'
import { ProductId } from '../entities/ProductId'

export class ProductNotFoundException extends ElementNotFoundException {

  static of(productId: ProductId) {
    return new ProductNotFoundException(`Product '${productId}' not found`)
  }
}
