import { Product } from 'src/domain/products/entities/Product'
import { ProductIdRestMapper } from './ProductIdRestMapper'
import { ToDTOMapper } from 'jf-architecture'
import { ProductRestDTO } from 'src/infrastructure-components/rest/products/dtos/ProductRestDTO'
import { MetadataRestMapper } from 'src/infrastructure/shared/adapters/rest/mappers/MetadataRestMapper'
import { Products } from 'src/domain/products/entities/Products'

export class ProductRestMapper extends ToDTOMapper<Product, ProductRestDTO> {
  private readonly productIdRestMapper = new ProductIdRestMapper()

  private readonly metadataRestMapper = new MetadataRestMapper()

  protected _toDTO(product: Product): ProductRestDTO {
    return new ProductRestDTO(
      this.productIdRestMapper.toDTO(product.id),
      product.title,
      product.description,
      product.isEnabled,
      this.metadataRestMapper.toDTO(product.metadata)
    )
  }

  productsToDTOS(products: Products): ProductRestDTO[] {
    return this.toDtoList(products.values)
  }
}
