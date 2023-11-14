import { MetadataMongoDTOMother } from "jf-nestjs-mongo"
import { ProductMongoDTO } from "./ProductMongoDTO"

export abstract class ProductMongoDTOMother {

    static oneEnabled() {
        const metadataDTO = MetadataMongoDTOMother.one()

        return new ProductMongoDTO(
            'product-one',
            'title-product-one',
            'description-product-one',
            true,
            metadataDTO
        )
    }
}