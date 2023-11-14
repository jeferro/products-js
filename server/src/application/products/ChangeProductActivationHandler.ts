import { ChangeProductActivation } from './commands/ChangeProductActivation'
import { LoggerCreator, BaseCommandHandler, CommandHandler } from 'jf-architecture'
import { Role } from 'src/domain/auth/entities/Role'
import { Product } from 'src/domain/products/entities/Product'
import { ProductsRepository } from 'src/domain/products/repositories/ProductsRepository'
import { ProductNotFoundException } from 'src/domain/products/exceptions/ProductNotFoundException'
import { ProductsStream } from 'src/domain/products/streams/ProductsStream'

@CommandHandler(ChangeProductActivation)
export class ChangeProductActivationHandler extends BaseCommandHandler<ChangeProductActivation, Product> {
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

  protected async handle(command: ChangeProductActivation): Promise<Product> {
    const auth = command.auth
    const productId = command.productId
    const enabled = command.enabled

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw ProductNotFoundException.of(productId)
    }

    if (product.isEnabled && enabled) {
      return product
    }

    if (product.isDisabled && !enabled) {
      return product
    }

    product.changeActivation(
      auth,
      enabled
    )

    await this.productsRepository.save(product)

    await this.productsStream.publishAll(product)

    return product
  }

}
