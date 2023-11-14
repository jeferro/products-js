import { UpsertProduct } from './commands/UpsertProduct'
import { LoggerCreator, BaseCommandHandler, CommandHandler } from 'jf-architecture'
import { Role } from 'src/domain/auth/entities/Role'
import { Product } from 'src/domain/products/entities/Product'
import { ProductsRepository } from 'src/domain/products/repositories/ProductsRepository'
import { ProductId } from 'src/domain/products/entities/ProductId'
import { ProductsStream } from 'src/domain/products/streams/ProductsStream'

@CommandHandler(UpsertProduct)
export class UpsertProductHandler extends BaseCommandHandler<UpsertProduct, Product> {
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

  protected async handle(command: UpsertProduct): Promise<Product> {
    const productId = command.productId

    const product = await this.productsRepository.findById(productId)

    const result = product
      ? await this.updateProduct(command, product)
      : await this.createProduct(productId, command)

    await this.productsStream.publishAll(result)

    return result
  }

  private async createProduct(productId: ProductId, command: UpsertProduct): Promise<Product> {
    const enabledProduct = Product.new(
      command.auth,
      productId,
      command.title,
      command.description
    )

    await this.productsRepository.save(enabledProduct)

    return enabledProduct
  }

  private async updateProduct(command: UpsertProduct, product: Product): Promise<Product> {
    product.update(
      command.auth,
      command.title,
      command.description
    )

    await this.productsRepository.save(product)

    return product
  }
}
