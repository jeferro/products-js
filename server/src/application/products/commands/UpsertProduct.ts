import { ProductId } from 'src/domain/products/entities/ProductId'
import { Command, Auth } from 'jf-architecture'

export class UpsertProduct extends Command {
  
  constructor(
    auth: Auth,
    readonly productId: ProductId,
    readonly title: string,
    readonly description: string,
  ) {
    super(auth)
  }
}
