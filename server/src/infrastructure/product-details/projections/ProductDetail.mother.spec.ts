import { ProductIdMother } from "src/domain/products/entities/ProductId.mother.spec"
import { ProductDetail } from "./ProductDetail"
import { ReviewsMother } from "./Reviews.mother.spec"
import { MetadataMother } from "jf-architecture"
import { ProductId } from "src/domain/products/entities/ProductId"

export abstract class ProductDetailMohther {

    static one(): ProductDetail {
        const productId = ProductIdMother.one()

        const ocurredOn = new Date()

        const reviews = ReviewsMother.one()
        const metadata = MetadataMother.one()

        return new ProductDetail(
            productId,
            'title of the product one',
            'description of the product one',
            true,
            ocurredOn,
            ocurredOn,
            reviews,
            metadata
        )
    }

    static oneDisabled(): ProductDetail {
        const productId = ProductIdMother.one()

        const ocurredOn = new Date()

        const reviews = ReviewsMother.one()
        const metadata = MetadataMother.one()

        return new ProductDetail(
            productId,
            'title of the product one',
            'description of the product one',
            false,
            ocurredOn,
            ocurredOn,
            reviews,
            metadata
        )
    }

    static oneOfProductId(
        productId: ProductId
    ): ProductDetail {
        const ocurredOn = new Date()

        const reviews = ReviewsMother.one()
        const metadata = MetadataMother.one()

        return new ProductDetail(
            productId,
            'title of the product one',
            'description of the product one',
            true,
            ocurredOn,
            ocurredOn,
            reviews,
            metadata
        )
    }
}