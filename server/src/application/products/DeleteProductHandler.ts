import { ProductsRepository } from 'src/domain/products/repositories/ProductsRepository'
import { DeleteProduct } from './commands/DeleteProduct'
import { Product } from 'src/domain/products/entities/Product'
import { ProductNotFoundException } from 'src/domain/products/exceptions/ProductNotFoundException'
import { LoggerCreator, BaseCommandHandler, CommandHandler } from 'jf-architecture'
import { Role } from 'src/domain/auth/entities/Role'
import { ProductsStream } from 'src/domain/products/streams/ProductsStream'

@CommandHandler(DeleteProduct)
export class DeleteProductHandler extends BaseCommandHandler<DeleteProduct, Product> {
  constructor(
    loggerCreator: LoggerCreator,
    private readonly productsRepository: ProductsRepository,
    private readonly productsStream: ProductsStream,
  ) {
    super(Product, loggerCreator)
  }

  protected get requiredRoles(): string[] {
    return [Role.USER]
  }

  protected async handle(command: DeleteProduct): Promise<Product> {
    const auth = command.auth
    const productId = command.productId

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw ProductNotFoundException.of(productId)
    }

    product.delete(auth)

    await this.productsRepository.deleteById(productId)

    await this.productsStream.publishAll(product)

    return product
  }
}
