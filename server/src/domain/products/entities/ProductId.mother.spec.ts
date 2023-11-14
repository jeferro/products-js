import { ProductId } from './ProductId'

export abstract class ProductIdMother {
  static one(): ProductId {
    return new ProductId('product-one')
  }
}
