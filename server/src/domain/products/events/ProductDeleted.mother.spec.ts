import { ProductMother } from "../entities/Product.mother.spec"
import { ProductDeleted } from "./ProductDeleted"

export class ProductDeletedMother {

    static one(): ProductDeleted {
        const product = ProductMother.oneEnabled()

        return ProductDeleted.of(product)
    }
}
