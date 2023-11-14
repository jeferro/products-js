import { Metadata, ToDTOMapper } from "jf-architecture"
import { MetadataRestDTO } from "jf-nestjs-rest"
import { UsernameRestMapper } from "./UsernameRestMapper"

export class MetadataRestMapper extends ToDTOMapper<Metadata, MetadataRestDTO> {
    
    private readonly usernameRestMapper = new UsernameRestMapper()

    protected _toDTO(entity: Metadata): MetadataRestDTO {
        return new MetadataRestDTO(
            this.usernameRestMapper.toDTO(entity.createdBy),
            entity.createdAt,
            this.usernameRestMapper.toDTO(entity.createdBy),
            entity.updatedAt
        )
    }
    
}