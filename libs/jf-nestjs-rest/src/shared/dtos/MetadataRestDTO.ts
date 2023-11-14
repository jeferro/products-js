
export class MetadataRestDTO {
    constructor(
        readonly createdBy: string,
        readonly createdAt: Date,
        readonly updatedBy: string,
        readonly updatedAt: Date
    ) { }
}