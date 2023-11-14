import { ProductIdKafkaMapper } from "./ProductIdKafkaMapper"
import { ProductUpdated } from "src/domain/products/events/ProductUpdated"
import { ProductUpdatedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO"
import { UsernameKafkaMapper } from "./UsernameKafkaMapper"
import { BidireccionalMapper } from "jf-architecture"

export class ProductUpdatedKafkaMapper extends BidireccionalMapper<ProductUpdated, ProductUpdatedKafkaDTO> {

    private readonly usernameKafkaMapper = new UsernameKafkaMapper()

    private readonly productIdKafkaMapper = new ProductIdKafkaMapper()
    
    protected _toDTO(entity: ProductUpdated): ProductUpdatedKafkaDTO {
        return new ProductUpdatedKafkaDTO(
            entity.ocurredOn,
            this.usernameKafkaMapper.toDTO(entity.ocurredBy),
            this.productIdKafkaMapper.toDTO(entity.productId),
            entity.title,
            entity.description
        )
    }

    protected _toEntity(dto: ProductUpdatedKafkaDTO): ProductUpdated {
        return new ProductUpdated(
            dto.ocurredOn,
            this.usernameKafkaMapper.toEntity(dto.ocurredBy),
            this.productIdKafkaMapper.toEntity(dto.productId),
            dto.title,
            dto.description
        )
    }
    
}