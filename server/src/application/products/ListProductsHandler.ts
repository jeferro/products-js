import { LoggerCreator, QueryHandler, BaseQueryHandler } from 'jf-architecture'
import { ListProducts } from './queries/ListProducts'
import { Role } from 'src/domain/auth/entities/Role'
import { Products } from 'src/domain/products/entities/Products'
import { ProductsRepository } from 'src/domain/products/repositories/ProductsRepository'
import { Product } from 'src/domain/products/entities/Product'

@QueryHandler(ListProducts)
export class ListProductsHandler extends BaseQueryHandler<ListProducts, Products> {
  constructor(
    loggerCreator: LoggerCreator,
    private readonly productsRepository: ProductsRepository,
  ) {
    super(Product, loggerCreator)
  }

  protected get requiredRoles(): string[] {
    return [Role.USER]
  }

  protected async handle(_: ListProducts): Promise<Products> {
    return this.productsRepository.findAll()
  }
}
