import { ProductMother } from "./Product.mother.spec"
import { Products } from "./Products"

export abstract class ProductsMother {

    static one(): Products {
        return new Products([
            ProductMother.oneEnabled(),
            ProductMother.twoDisabled(),
        ])
    }
}