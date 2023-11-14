import { ProductMother } from "../entities/Product.mother.spec"
import { ProductCreated } from "./ProductCreated"

export class ProductCreatedMother {

    static one(): ProductCreated {
        const product = ProductMother.oneEnabled()

        return ProductCreated.of(product)
    }
}
