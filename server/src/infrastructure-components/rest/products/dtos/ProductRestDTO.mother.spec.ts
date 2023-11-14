import { ProductRestDTO } from "./ProductRestDTO"
import { MetadataRestDTOMother } from "jf-nestjs-rest"

export abstract class ProductRestDTOMother {

    static oneEnabled(): ProductRestDTO {
        return new ProductRestDTO(
            'one-product',
            'title one-product',
            'description one-product',
            true,
            MetadataRestDTOMother.one()
        )
    }

    static oneDisabled(): ProductRestDTO {
        return new ProductRestDTO(
            'one-product',
            'title one-product',
            'description one-product',
            false,
            MetadataRestDTOMother.one()
        )
    }

    static twoEnabled(): ProductRestDTO {
        return new ProductRestDTO(
            'two-product',
            'title two-product',
            'description two-product',
            true,
            MetadataRestDTOMother.one()
        )
    }
}