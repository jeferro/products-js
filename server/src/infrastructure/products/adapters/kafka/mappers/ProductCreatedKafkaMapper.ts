import { ProductCreated } from "src/domain/products/events/ProductCreated"
import { ProductCreatedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO"
import { ProductIdKafkaMapper } from "./ProductIdKafkaMapper"
import { UsernameKafkaMapper } from "./UsernameKafkaMapper"
import { BidireccionalMapper } from "jf-architecture"

export class ProductCreatedKafkaMapper extends BidireccionalMapper<ProductCreated, ProductCreatedKafkaDTO> {

    private readonly usernameKafkaMapper = new UsernameKafkaMapper()

    private readonly productIdKafkaMapper = new ProductIdKafkaMapper()
    
    protected _toDTO(entity: ProductCreated): ProductCreatedKafkaDTO {
        return new ProductCreatedKafkaDTO(
            entity.ocurredOn,
            this.usernameKafkaMapper.toDTO(entity.ocurredBy),
            this.productIdKafkaMapper.toDTO(entity.productId),
            entity.title,
            entity.description,
            entity.enabled
        )
    }

    protected _toEntity(dto: ProductCreatedKafkaDTO): ProductCreated {
        return new ProductCreated(
            dto.ocurredOn,
            this.usernameKafkaMapper.toEntity(dto.ocurredBy),
            this.productIdKafkaMapper.toEntity(dto.productId),
            dto.title,
            dto.description,
            dto.enabled
        )
    }
    
}