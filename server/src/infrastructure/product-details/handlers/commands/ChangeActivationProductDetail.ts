import { Command, Auth } from 'jf-architecture'
import { ProductId } from 'src/domain/products/entities/ProductId'


export class ChangeProductDetailActivation extends Command {
    
  constructor(
    auth: Auth,
    readonly productId: ProductId,
    readonly enabled: boolean,
    readonly ocurredOn: Date
  ) {
    super(auth)
  }
}