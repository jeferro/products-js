import { Product } from '../entities/Product'
import { ProductId } from '../entities/ProductId'
import { ProductEvent } from './ProductEvent'
import { Username } from 'jf-architecture'

export class ProductActivationChanged extends ProductEvent {

  constructor(
    ocurredOn: Date,
    ocurredBy: Username,
    productId: ProductId,
    readonly enabled: boolean
  ) {
    super(ocurredBy, ocurredOn, productId)
  }

  static of(product: Product): ProductActivationChanged {
    return new ProductActivationChanged(
      product.updatedAt,
      product.updatedBy,
      product.id,
      product.isEnabled
    )
  }
}
