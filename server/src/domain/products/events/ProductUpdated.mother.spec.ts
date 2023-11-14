import { ProductMother } from "../entities/Product.mother.spec"
import { ProductUpdated } from "./ProductUpdated"

export class ProductUpdatedMother {

    static one(): ProductUpdated {
        const product = ProductMother.oneEnabled()

        return ProductUpdated.of(product)
    }
}
