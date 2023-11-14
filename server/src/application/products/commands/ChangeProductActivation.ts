import { ProductId } from 'src/domain/products/entities/ProductId'
import { Command, Auth } from 'jf-architecture'

export class ChangeProductActivation extends Command {
  constructor(
    auth: Auth,
    readonly productId: ProductId,
    readonly enabled: boolean
  ) {
    super(auth)
  }
}
