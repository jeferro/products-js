import { MetadataMongoDTO } from "./MetadataMongoDTO"

export class MetadataMongoDTOMother {

    static one(): MetadataMongoDTO {
        const now = new Date()

        return new MetadataMongoDTO(
            'username',
            now,
            'username',
            now
        )
    }
}