import { ProductIdKafkaMapper } from "./ProductIdKafkaMapper"
import { ProductDeleted } from "src/domain/products/events/ProductDeleted"
import { UsernameKafkaMapper } from "./UsernameKafkaMapper"
import { BidireccionalMapper } from "jf-architecture"
import { ProductDeletedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO "

export class ProductDeletedKafkaMapper extends BidireccionalMapper<ProductDeleted, ProductDeletedKafkaDTO> {

    private readonly usernameKafkaMapper = new UsernameKafkaMapper()

    private readonly productIdKafkaMapper = new ProductIdKafkaMapper()
    
    protected _toDTO(entity: ProductDeleted): ProductDeletedKafkaDTO {
        return new ProductDeletedKafkaDTO(
            entity.ocurredOn,
            this.usernameKafkaMapper.toDTO(entity.ocurredBy),
            this.productIdKafkaMapper.toDTO(entity.productId)
        )
    }

    protected _toEntity(dto: ProductDeletedKafkaDTO): ProductDeleted {
        return new ProductDeleted(
            dto.ocurredOn,
            this.usernameKafkaMapper.toEntity(dto.ocurredBy),
            this.productIdKafkaMapper.toEntity(dto.productId)
        )
    }
    
}