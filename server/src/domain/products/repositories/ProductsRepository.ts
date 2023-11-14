import { Repository } from 'jf-architecture'
import { Product } from '../entities/Product'
import { ProductId } from '../entities/ProductId'
import { Products } from '../entities/Products'

export abstract class ProductsRepository extends Repository<Product> {
  abstract save(product: Product): Promise<void>

  abstract findById(productId: ProductId): Promise<Product | undefined>

  abstract deleteById(productId: ProductId): Promise<void>

  abstract findAll(): Promise<Products>
}
