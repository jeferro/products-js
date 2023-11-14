import { DomainEvent, Username } from 'jf-architecture'
import { ProductId } from '../entities/ProductId'

export abstract class ProductEvent extends DomainEvent {

  constructor(
    ocurredBy: Username,
    ocurredOn: Date,
    readonly productId: ProductId,
  ) {
    super(ocurredBy, ocurredOn)
  }
}
