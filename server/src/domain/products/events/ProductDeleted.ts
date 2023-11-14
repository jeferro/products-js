import { Product } from '../entities/Product'
import { ProductId } from '../entities/ProductId'
import { ProductEvent } from './ProductEvent'
import { Username } from 'jf-architecture'

export class ProductDeleted extends ProductEvent {

  constructor(
    ocurredOn: Date,
    ocurredBy: Username,
    productId: ProductId,
  ) {
    super(ocurredBy, ocurredOn, productId)
  }

  static of(product: Product): ProductDeleted {
    return new ProductDeleted(
      product.updatedAt,
      product.updatedBy,
      product.id
    )
  }
}
