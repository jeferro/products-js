import { CollectionEntity } from 'jf-architecture'
import { Product } from './Product'
import { ProductId } from './ProductId'

export class Products extends CollectionEntity<Product, ProductId> {
  static of(...products: Product[]) {
    return new Products(products)
  }

  static ofArray(products: Product[]) {
    return new Products(products)
  }
}
