import { Username } from "jf-architecture"
import { BidireccionalMapper } from "jf-architecture"


export class UsernameKafkaMapper extends BidireccionalMapper<Username, string> {
    
    protected _toDTO(entity: Username): string {
        return entity.value
    }

    protected _toEntity(dto: string): Username {
        return new Username(dto)
    }
    
}