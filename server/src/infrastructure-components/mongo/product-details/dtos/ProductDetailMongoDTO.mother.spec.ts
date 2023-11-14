import { MetadataMongoDTOMother } from "jf-nestjs-mongo"
import { ProductDetailMongoDTO } from "./ProductDetailMongoDTO"
import { ReviewMongoDTOMother } from "./ReviewMongoDTO.mother.spec"

export abstract class ProductDetailMongoDTOMother {

    static one() {
        const ocurredOn = new Date()

        const reviews = [
            ReviewMongoDTOMother.one(),
            ReviewMongoDTOMother.two()
        ]

        const metadata = MetadataMongoDTOMother.one()

        return new ProductDetailMongoDTO(
            'product-one',
            'title',
            'description',
            true,
            ocurredOn,
            ocurredOn,
            reviews,
            metadata
        )
    }
}