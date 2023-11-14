import { MetadataRestDTOMother } from "jf-nestjs-rest"
import { ProductDetailRestDTO } from "./ProductDetailRestDTO"
import { ReviewRestDTOMother } from "./ReviewRestDTO.mother.spec"

export abstract class ProductDetailRestDTOMother {

    static one(): ProductDetailRestDTO {
        const reviewDTOS = [
            ReviewRestDTOMother.one(),
            ReviewRestDTOMother.two()
        ]

        const metadataDTO = MetadataRestDTOMother.one()

        return new ProductDetailRestDTO(
            'product-one',
            'title of the product one',
            'description of the product one',
            true,
            reviewDTOS,
            metadataDTO
        )
    }
}