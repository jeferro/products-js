import { ProductUpdatedMongoDTO } from "./ProductUpdatedMongoDTO"


export abstract class ProductUpdatedMongoDTOMother {

    static one(): ProductUpdatedMongoDTO {
        const now = new Date()

        return new ProductUpdatedMongoDTO(
            'one-product-updated',
            now,
            'user',
            'one-product',
            'title product one',
            'description product one'
        )
    }
}