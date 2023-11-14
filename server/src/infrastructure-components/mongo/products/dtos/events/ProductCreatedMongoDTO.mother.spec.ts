import { ProductCreatedMongoDTO } from "./ProductCreatedMongoDTO"


export abstract class ProductCreatedMongoDTOMother {

    static one(): ProductCreatedMongoDTO {
        const now = new Date()

        return new ProductCreatedMongoDTO(
            'one-product-created',
            now,
            'user',
            'one-product',
            'title of product one',
            'description of product one',
            true
        )
    }
}