import { FlattenMaps } from "mongoose"
import { MongoDTO } from "jf-nestjs-mongo"


export class ReviewMongoDTO extends MongoDTO {

    constructor(
        readonly ownerId: string,
        readonly comment: string
    ) {
        super()
    }

    static ofModel(model: FlattenMaps<ReviewMongoDTO>): ReviewMongoDTO {
        return new ReviewMongoDTO(
            model.ownerId,
            model.comment
        )
    }
}