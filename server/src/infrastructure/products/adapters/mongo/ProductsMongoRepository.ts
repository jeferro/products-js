import { Injectable } from '@nestjs/common'
import { ProductIdMongoMapper } from './mappers/ProductIdMongoMapper'
import { ProductMongoMapper } from './mappers/ProductMongoMapper'
import { ProductsRepository } from 'src/domain/products/repositories/ProductsRepository'
import { Product } from 'src/domain/products/entities/Product'
import { ProductId } from 'src/domain/products/entities/ProductId'
import { Products } from 'src/domain/products/entities/Products'
import { ProductsMongoClient } from 'src/infrastructure-components/mongo/products/ProductsMongoClient'

@Injectable()
export class ProductsMongoRepository extends ProductsRepository {
  private readonly productIdMongoMapper = new ProductIdMongoMapper()

  private readonly productMongoMapper = new ProductMongoMapper()

  constructor(
    private readonly ProductsMongoClient: ProductsMongoClient) {
    super()
  }

  async save(product: Product): Promise<void> {
    const productDTO = this.productMongoMapper.toDTO(product)

    await this.ProductsMongoClient.save(productDTO)
  }

  async findById(productId: ProductId): Promise<Product | undefined> {  
    const productIdDTO = this.productIdMongoMapper.toDTO(productId)

    const productDTO = await this.ProductsMongoClient.findById(productIdDTO)

    return this.productMongoMapper.toEntityOrUndefined(productDTO)
  }

  async deleteById(productId: ProductId): Promise<void> {
    const productIdDTO = this.productIdMongoMapper.toDTO(productId)

    return await this.ProductsMongoClient.deleteById(productIdDTO)
  }

  async findAll(): Promise<Products> {
    const productDTOS = await this.ProductsMongoClient.findAll()

    return this.productMongoMapper.toProducts(productDTOS)
  }
}
