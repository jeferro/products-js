import { ReviewRestDTO } from "src/infrastructure-components/rest/product-details/dtos/ReviewRestDTO"
import { Review } from "src/infrastructure/product-details/projections/Review"
import { Reviews } from "src/infrastructure/product-details/projections/Reviews"
import { UsernameRestMapper } from "src/infrastructure/shared/adapters/rest/mappers/UsernameRestMapper"
import { ToDTOMapper } from "jf-architecture"

export class ReviewRestMapper extends ToDTOMapper<Review, ReviewRestDTO> {

    private readonly usernameRestMapper = new UsernameRestMapper()

    protected _toDTO(entity: Review): ReviewRestDTO {
        return new ReviewRestDTO(
            this.usernameRestMapper.toDTO(entity.ownerId),
            entity.comment
        )
    }

    reviewsToDTOS(reviews: Reviews): ReviewRestDTO[] {
        return reviews.values.map(review => this.toDTO(review))
    }

}