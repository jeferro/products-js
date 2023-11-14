import { ProductDetailsRestControllerSpec } from "src/infrastructure-components/rest/product-details/ProductDetailsRestControllerSpec"
import { ProductDetailRestDTO } from "src/infrastructure-components/rest/product-details/dtos/ProductDetailRestDTO"
import { AuthRestDTO } from "jf-nestjs-rest"

export class ProductDetailsRestControllerMock extends ProductDetailsRestControllerSpec {

    readonly onGetProductDetailMock = jest.fn()

    onGetProductDetail(
        authDTO: AuthRestDTO | undefined,
        productIdDTO: string
    ): Promise<ProductDetailRestDTO> {
        return this.onGetProductDetailMock(
            authDTO,
            productIdDTO
        )
    }

}