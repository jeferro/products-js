import { ProductId } from "src/domain/products/entities/ProductId"
import { ProductDetail } from "../../projections/ProductDetail"
import { ProductDetailsRepository } from "../../repositories/ProductDetailsRepository"
import { ProductDetailMongoMapper } from "./mappers/ProductDetailMongoMapper"
import { ProductDetailsMongoClient } from "src/infrastructure-components/mongo/product-details/ProductDetailsMongoClient"
import { ProductIdMongoMapper } from "src/infrastructure/products/adapters/mongo/mappers/ProductIdMongoMapper"
import { Injectable } from "@nestjs/common"

@Injectable()
export class ProductDetailsMongoRepository extends ProductDetailsRepository {

    private readonly productDetailMongoMapper = new ProductDetailMongoMapper()

    private readonly productIdMongoMapper = new ProductIdMongoMapper()

    constructor(
        private readonly productDetailMongoClient: ProductDetailsMongoClient
    ) { 
        super()
    }

    async save(productDetail: ProductDetail): Promise<void> {
        const productDetailDTO = this.productDetailMongoMapper.toDTO(productDetail)

        await this.productDetailMongoClient.save(productDetailDTO)
    }

    async findById(productId: ProductId): Promise<ProductDetail | undefined> {
        const productIdDTO = this.productIdMongoMapper.toDTO(productId)

        const productDetailDTO = await this.productDetailMongoClient.findById(productIdDTO)

        return this.productDetailMongoMapper.toEntityOrUndefined(productDetailDTO)
    }

    async deleteById(productId: ProductId): Promise<void> {
        const productIdDTO = this.productIdMongoMapper.toDTO(productId)

        await this.productDetailMongoClient.deleteById(productIdDTO)
    }

}