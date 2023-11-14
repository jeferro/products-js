import { ProductActivationChangedMongoDTO } from "./ProductActivationChangedMongoDTO"


export abstract class ProductActivationChangedMongoDTOMother {

    static one(): ProductActivationChangedMongoDTO {
        const now = new Date()

        return new ProductActivationChangedMongoDTO(
            'one-product-enabled',
            now,
            'user',
            'one-product',
            true
        )
    }
}