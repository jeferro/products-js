import { Type } from "class-transformer"

export class MetadataKafkaDTO {

    readonly type: string

    @Type(() => Date)
    readonly sentAt: Date

    constructor(
        type: string,
        sentAt: Date
    ) { 
        this.type = type
        this.sentAt = sentAt
    }
}