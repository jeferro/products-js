import { ProductDeletedMongoDTO } from "./ProductDeletedMongoDTO"


export abstract class ProductDeletedMongoDTOMother {

    static one(): ProductDeletedMongoDTO {
        const now = new Date()

        return new ProductDeletedMongoDTO(
            'one-product-deleted',
            now,
            'user',
            'one-product'
        )
    }
}