import { Command, Auth } from 'jf-architecture'
import { ProductId } from 'src/domain/products/entities/ProductId'


export class UpsertProductDetail extends Command {
    
  constructor(
    auth: Auth,
    readonly productId: ProductId,
    readonly title: string,
    readonly description: string,
    readonly enabled: boolean | undefined,
    readonly ocurredOn: Date
  ) {
    super(auth)
  }
}