import { GetProduct } from './queries/GetProduct'
import { LoggerCreator, QueryHandler, BaseQueryHandler } from 'jf-architecture'
import { Role } from 'src/domain/auth/entities/Role'
import { Product } from 'src/domain/products/entities/Product'
import { ProductsRepository } from 'src/domain/products/repositories/ProductsRepository'
import { ProductNotFoundException } from 'src/domain/products/exceptions/ProductNotFoundException'

@QueryHandler(GetProduct)
export class GetProductHandler extends BaseQueryHandler<GetProduct, Product> {
  constructor(
    loggerCreator: LoggerCreator,
    private readonly productsRepository: ProductsRepository,
  ) {
    super(Product, loggerCreator)
  }

  protected get requiredRoles(): string[] {
    return [Role.USER]
  }

  protected async handle(query: GetProduct): Promise<Product> {
    const productId = query.productId

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw ProductNotFoundException.of(productId)
    }

    return product
  }
}
