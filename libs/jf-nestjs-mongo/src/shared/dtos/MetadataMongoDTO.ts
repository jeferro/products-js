import { FlattenMaps } from "mongoose"

export class MetadataMongoDTO {
    constructor(
        readonly createdBy: string,
        readonly createdAt: Date,
        readonly updatedBy: string,
        readonly updatedAt: Date
    ) { }

    get isNew(): boolean {
        return this.createdAt == this.updatedAt
    }

    static ofModel(model: FlattenMaps<MetadataMongoDTO>): MetadataMongoDTO {
        return new MetadataMongoDTO(
            model.createdBy,
            model.createdAt,
            model.updatedBy,
            model.updatedAt
        )
    }
}