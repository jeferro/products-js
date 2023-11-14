import { MetadataRestDTO } from "./MetadataRestDTO"


export abstract class MetadataRestDTOMother {

    static one(): MetadataRestDTO {
        const now = new Date()

        return new MetadataRestDTO(
            'one-user',
            now, 
            'one-user',
            now
        )
    }
}