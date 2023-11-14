import { ProductId } from 'src/domain/products/entities/ProductId'
import { Query, Auth } from 'jf-architecture'

export class GetProductDetail extends Query {
  constructor(
    auth: Auth,
    readonly productId: ProductId,
  ) {
    super(auth)
  }
}
