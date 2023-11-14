import { MetadataKafkaDTO } from "./MetadataKafkaDTO"

export class EnvelopeKafkaDTO<T> {

    constructor(
        readonly metadata: MetadataKafkaDTO,
        readonly payload: T
    ) { }

    get type(): string {
        return this.metadata.type
    }
}