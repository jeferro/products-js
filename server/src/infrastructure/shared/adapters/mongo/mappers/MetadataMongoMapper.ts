import { Metadata, BidireccionalMapper } from "jf-architecture"
import { MetadataMongoDTO } from 'jf-nestjs-mongo'
import { UsernameMongoMapper } from "./UsernameMongoMapper"

export class MetadataMongoMapper extends BidireccionalMapper<Metadata, MetadataMongoDTO> {

    private readonly usernameMongoMapper = new UsernameMongoMapper()

    protected _toDTO(entity: Metadata): MetadataMongoDTO {
        return new MetadataMongoDTO(
            this.usernameMongoMapper.toDTO(entity.createdBy),
            entity.createdAt,
            this.usernameMongoMapper.toDTO(entity.createdBy),
            entity.updatedAt
        )
    }

    protected _toEntity(dto: MetadataMongoDTO): Metadata {
        return new Metadata(
            this.usernameMongoMapper.toEntity(dto.createdBy),
            dto.createdAt,
            this.usernameMongoMapper.toEntity(dto.createdBy),
            dto.updatedAt
        )
    }

}