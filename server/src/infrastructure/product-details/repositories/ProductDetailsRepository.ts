import { Repository } from "jf-architecture"
import { ProductDetail } from "../projections/ProductDetail"
import { ProductId } from "src/domain/products/entities/ProductId"

export abstract class ProductDetailsRepository extends Repository<ProductDetail> {

    abstract save(productDetail: ProductDetail): Promise<void>

    abstract findById(productId: ProductId): Promise<ProductDetail | undefined>

    abstract deleteById(productId: ProductId): Promise<void>
}