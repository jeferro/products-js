import { ProductId } from "src/domain/products/entities/ProductId"
import { ProductDetail } from "../../projections/ProductDetail"
import { ProductDetailsRepository } from "../../repositories/ProductDetailsRepository"

export class ProductDetailInMemoryRepository extends ProductDetailsRepository {

    private data = new Map<string, ProductDetail>()

    reset(...productDetails: ProductDetail[]) {
        this.data.clear()

        if (!productDetails) {
            return
        }

        for (const productDetail of productDetails) {
            this.data.set(productDetail.id.value, productDetail)
        }
    }

    async save(productDetail: ProductDetail): Promise<void> {
        this.data.set(productDetail.id.value, productDetail)
    }

    async findById(productId: ProductId): Promise<ProductDetail | undefined> {
        return this.data.get(productId.value)
    }

    async deleteById(productId: ProductId): Promise<void> {
        this.data.delete(productId.value)
    }

}