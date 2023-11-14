import { ProductMother } from "../entities/Product.mother.spec"
import { ProductActivationChanged } from "./ProductActivationChanged"

export class ProductActivationChangedMother {

    static one(): ProductActivationChanged {
        const product = ProductMother.oneEnabled()

        return ProductActivationChanged.of(product)
    }
}
