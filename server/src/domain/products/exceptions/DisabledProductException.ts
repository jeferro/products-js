import { ProductId } from '../entities/ProductId'
import { ForbiddenException } from 'jf-architecture'

export class DisabledProductException extends ForbiddenException {

  static ofProductId(productId: ProductId) {
    return new DisabledProductException(
      `Operation forbidden because the product '${productId}' is disabled`
    )
  }
}
