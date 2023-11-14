import { MetadataMongoDTOMother } from "jf-nestjs-mongo"
import { UserMongoDTO } from "./UserMongoDTO"

export abstract class UserMongoDTOMother {

    static one() {
        const metadataDTO = MetadataMongoDTOMother.one()

        return new UserMongoDTO(
            'userone',
            'encrypted-password',
            ['user'],
            metadataDTO
        )
    }
}