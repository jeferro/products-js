import { Product } from '../entities/Product'
import { ProductId } from '../entities/ProductId'
import { ProductEvent } from './ProductEvent'
import { Username } from 'jf-architecture'

export class ProductUpdated extends ProductEvent {

  constructor(
    ocurredOn: Date,
    ocurredBy: Username,
    productId: ProductId,
    readonly title: string,
    readonly description: string
  ) {
    super(ocurredBy, ocurredOn, productId)
  }

  static of(product: Product): ProductUpdated {
    return new ProductUpdated(
      product.updatedAt,
      product.updatedBy,
      product.id,
      product.title,
      product.description
    )
  }
}
