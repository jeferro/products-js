import { ProductIdKafkaMapper } from "./ProductIdKafkaMapper"
import { UsernameKafkaMapper } from "./UsernameKafkaMapper"
import { BidireccionalMapper } from "jf-architecture"
import { ProductActivationChangedKafkaDTO } from "src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO"
import { ProductActivationChanged } from "src/domain/products/events/ProductActivationChanged"

export class ProductActivationChangedKafkaMapper extends BidireccionalMapper<ProductActivationChanged, ProductActivationChangedKafkaDTO> {

    private readonly usernameKafkaMapper = new UsernameKafkaMapper()

    private readonly productIdKafkaMapper = new ProductIdKafkaMapper()
    
    protected _toDTO(entity: ProductActivationChanged): ProductActivationChangedKafkaDTO {
        return new ProductActivationChangedKafkaDTO(
            entity.ocurredOn,
            this.usernameKafkaMapper.toDTO(entity.ocurredBy),
            this.productIdKafkaMapper.toDTO(entity.productId),
            entity.enabled
        )
    }

    protected _toEntity(dto: ProductActivationChangedKafkaDTO): ProductActivationChanged {
        return new ProductActivationChanged(
            dto.ocurredOn,
            this.usernameKafkaMapper.toEntity(dto.ocurredBy),
            this.productIdKafkaMapper.toEntity(dto.productId),
            dto.enabled
        )
    }
    
}