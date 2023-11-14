import { Controller } from "@nestjs/common"
import { ProductDetailsRestControllerSpec } from "src/infrastructure-components/rest/product-details/ProductDetailsRestControllerSpec"
import { ProductDetailRestDTO } from "src/infrastructure-components/rest/product-details/dtos/ProductDetailRestDTO"
import { ProductIdRestMapper } from "src/infrastructure/products/adapters/rest/mappers/ProductIdRestMapper"
import { QueryBus } from "jf-architecture"
import { RestAuthService, AuthRestDTO } from "jf-nestjs-rest"
import { GetProductDetail } from "../../handlers/queries/GetProductDetail"
import { AuthRestMapper } from "src/infrastructure/auth/adapters/rest/mappers/AuthRestMapper"
import { ProductDetailRestMapper } from "./mappers/ProductDetailRestMapper"
import { ProductDetail } from "../../projections/ProductDetail"


@Controller()
export class ProductDetailsRestController extends ProductDetailsRestControllerSpec {

    private readonly authRestMapper = new AuthRestMapper()

    private readonly productIdRestMapper = new ProductIdRestMapper()

    private readonly productDetailRestMapper = new ProductDetailRestMapper()

    constructor(
        restAuthService: RestAuthService,
        private readonly queryBus: QueryBus
    ) {
        super(restAuthService)
    }

    async onGetProductDetail(
        authDTO: AuthRestDTO | undefined,
        productIdDTO: string
    ): Promise<ProductDetailRestDTO> {
        const query = new GetProductDetail(
            this.authRestMapper.toEntity(authDTO),
            this.productIdRestMapper.toEntity(productIdDTO)
        )
        
        const productDetail = await this.queryBus.execute<ProductDetail>(query)

        return this.productDetailRestMapper.toDTO(productDetail)
    }
}