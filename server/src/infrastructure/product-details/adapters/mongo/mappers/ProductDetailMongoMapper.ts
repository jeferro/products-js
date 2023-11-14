import { ProductDetailMongoDTO } from "src/infrastructure-components/mongo/product-details/dtos/ProductDetailMongoDTO"
import { ProductDetail } from "src/infrastructure/product-details/projections/ProductDetail"
import { ProductIdMongoMapper } from "src/infrastructure/products/adapters/mongo/mappers/ProductIdMongoMapper"
import { MetadataMongoMapper } from "src/infrastructure/shared/adapters/mongo/mappers/MetadataMongoMapper"
import { BidireccionalMapper } from "jf-architecture"
import { ReviewMongoMapper } from "./ReviewMongoMapper"

export class ProductDetailMongoMapper extends BidireccionalMapper<ProductDetail, ProductDetailMongoDTO> {
    
    private readonly productIdMongoMapper = new ProductIdMongoMapper()

    private readonly reviewMongoMapper = new ReviewMongoMapper()

    private readonly metadataMongoMapper = new MetadataMongoMapper()

    protected _toEntity(dto: ProductDetailMongoDTO): ProductDetail {
        return new ProductDetail(
            this.productIdMongoMapper.toEntity(dto._id),
            dto.title,
            dto.description,
            dto.enabled,
            dto.infoOcurredOn,
            dto.activationOcurredOn,
            this.reviewMongoMapper.toReviews(dto.reviews),
            this.metadataMongoMapper.toEntity(dto.metadata)
        )
    }

    protected _toDTO(entity: ProductDetail): ProductDetailMongoDTO {
        return new ProductDetailMongoDTO(
            this.productIdMongoMapper.toDTO(entity.id),
            entity.title,
            entity.description,
            entity.isEnabled,
            entity.infoOccurredOn,
            entity.activationOccurredOn,
            this.reviewMongoMapper.toDtoList(entity.reviews.values),
            this.metadataMongoMapper.toDTO(entity.metadata)
        )
    }
    
}