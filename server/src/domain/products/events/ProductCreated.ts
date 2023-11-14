import { Product } from '../entities/Product'
import { ProductId } from '../entities/ProductId'
import { ProductEvent } from './ProductEvent'
import { Username } from 'jf-architecture'

export class ProductCreated extends ProductEvent {

  constructor(
    ocurredOn: Date,
    ocurredBy: Username,
    productId: ProductId,
    readonly title,
    readonly description,
    readonly enabled
  ) {
    super(ocurredBy, ocurredOn, productId)
  }

  static of(product: Product): ProductCreated {
    return new ProductCreated(
      product.updatedAt,
      product.updatedBy,
      product.id,
      product.title,
      product.description,
      product.isEnabled
    )
  }
}
