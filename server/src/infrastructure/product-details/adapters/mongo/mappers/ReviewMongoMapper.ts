import { ReviewMongoDTO } from "src/infrastructure-components/mongo/product-details/dtos/ReviewMongoDTO"
import { Review } from "src/infrastructure/product-details/projections/Review"
import { Reviews } from "src/infrastructure/product-details/projections/Reviews"
import { UsernameMongoMapper } from "src/infrastructure/shared/adapters/mongo/mappers/UsernameMongoMapper"
import { BidireccionalMapper } from "jf-architecture"

export class ReviewMongoMapper extends BidireccionalMapper<Review, ReviewMongoDTO> {
    
    private readonly usernameMongoMapper = new UsernameMongoMapper()

    protected _toEntity(dto: ReviewMongoDTO): Review {
        return new Review(
            this.usernameMongoMapper.toEntity(dto.ownerId),
            dto.comment
        )
    }

    protected _toDTO(entity: Review): ReviewMongoDTO {
        return new ReviewMongoDTO(
            this.usernameMongoMapper.toDTO(entity.ownerId),
            entity.comment
        )
    }

    toReviews(dtos: ReviewMongoDTO[]): Reviews {
        return new Reviews(
            this.toEntityList(dtos)
        )
    }
    
}