import { ProductIdMongoMapper } from './ProductIdMongoMapper'
import { BidireccionalMapper } from 'jf-architecture'
import { Product } from 'src/domain/products/entities/Product'
import { Products } from 'src/domain/products/entities/Products'
import { ProductMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/products/ProductMongoDTO'
import { MetadataMongoMapper } from 'src/infrastructure/shared/adapters/mongo/mappers/MetadataMongoMapper'

export class ProductMongoMapper extends BidireccionalMapper<Product, ProductMongoDTO> {

  private readonly productIdMongoMapper = new ProductIdMongoMapper()

  private readonly metadataMongoMapper = new MetadataMongoMapper()

  protected _toEntity(dto: ProductMongoDTO): Product {
    const productId = this.productIdMongoMapper.toEntity(dto._id)
    const metadata = this.metadataMongoMapper.toEntity(dto.metadata)

    return new Product(
      productId,
      dto.title,
      dto.description,
      dto.enabled,
      metadata
    )
  }

  protected _toDTO(entity: Product): ProductMongoDTO {
    return new ProductMongoDTO(
      this.productIdMongoMapper.toDTO(entity.id),
      entity.title,
      entity.description,
      entity.isEnabled,
      this.metadataMongoMapper.toDTO(entity.metadata)
    )
  }

  toProducts(dtos: ProductMongoDTO[]): Products {
    const values = this.toEntityList(dtos)

    return Products.ofArray(values)
  }
}
