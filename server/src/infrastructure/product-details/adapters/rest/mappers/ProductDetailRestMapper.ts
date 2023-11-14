import { ProductDetailRestDTO } from "src/infrastructure-components/rest/product-details/dtos/ProductDetailRestDTO"
import { ProductDetail } from "src/infrastructure/product-details/projections/ProductDetail"
import { ToDTOMapper } from "jf-architecture"
import { ReviewRestMapper } from "./ReviewRestMapper"
import { ProductIdRestMapper } from "src/infrastructure/products/adapters/rest/mappers/ProductIdRestMapper"
import { MetadataRestMapper } from "src/infrastructure/shared/adapters/rest/mappers/MetadataRestMapper"

export class ProductDetailRestMapper extends ToDTOMapper<ProductDetail, ProductDetailRestDTO> {
    
    private readonly productIdRestMapper = new ProductIdRestMapper()

    private readonly reviewRestMapper = new ReviewRestMapper()

    private readonly metadataRestMapper = new MetadataRestMapper()

    protected _toDTO(entity: ProductDetail): ProductDetailRestDTO {
        return new ProductDetailRestDTO(
            this.productIdRestMapper.toDTO(entity.id),
            entity.title,
            entity.description,
            entity.isEnabled,
            this.reviewRestMapper.reviewsToDTOS(entity.reviews),
            this.metadataRestMapper.toDTO(entity.metadata)
        )
    }
    
}