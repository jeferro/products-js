import { ProductsRestControllerSpec } from "src/infrastructure-components/rest/products/ProductsRestControllerSpec"
import { ProductRestDTO } from "src/infrastructure-components/rest/products/dtos/ProductRestDTO"
import { ChangeProductActivationRestInput } from "src/infrastructure-components/rest/products/inputs/ChangeProductActivationRestInput"
import { UpsertProductRestInput } from "src/infrastructure-components/rest/products/inputs/UpsertProductRestInput"
import { AuthRestDTO } from "jf-nestjs-rest"

export class ProductsRestControllerMock extends ProductsRestControllerSpec {
    
    readonly onListProductsMock = jest.fn()

    readonly onUpsertProductMock = jest.fn()

    readonly onGetProductMock = jest.fn()

    readonly onChangeProductActivationMock = jest.fn()

    readonly onDeleteProductMock = jest.fn()
        
    
    onListProducts(authDTO: AuthRestDTO | undefined): Promise<ProductRestDTO[]> {
        return this.onListProductsMock(authDTO)
    }

    onUpsertProduct(authDTO: AuthRestDTO | undefined, productIdDTO: string, input: UpsertProductRestInput): Promise<ProductRestDTO> {
        return this.onUpsertProductMock(
            authDTO,
            productIdDTO,
            input
        )
    }

    onGetProduct(authDTO: AuthRestDTO | undefined, productIdDTO: string): Promise<ProductRestDTO> {
        return this.onGetProductMock(
            authDTO,
            productIdDTO
        )
    }

    onChangeProductActivation(authDTO: AuthRestDTO | undefined, productIdDTO: string, input: ChangeProductActivationRestInput): Promise<ProductRestDTO> {
        return this.onChangeProductActivationMock(
            authDTO,
            productIdDTO,
            input
        )
    }

    onDeleteProduct(authDTO: AuthRestDTO | undefined, productIdDTO: string): Promise<ProductRestDTO> {
        return this.onDeleteProductMock(
            authDTO,
            productIdDTO
        )
    }
    
}