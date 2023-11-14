import { ProductId } from 'src/domain/products/entities/ProductId'
import { Command, Auth } from 'jf-architecture'


export class DeleteProductDetail extends Command {
    
  constructor(
    auth: Auth,
    readonly productId: ProductId
  ) {
    super(auth)
  }
}