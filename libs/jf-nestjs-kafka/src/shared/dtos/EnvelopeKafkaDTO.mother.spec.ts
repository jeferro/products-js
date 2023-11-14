import { MetadataKafkaDTO } from "./MetadataKafkaDTO";
import { EnvelopeKafkaDTO } from "./EnvelopeKafkaDTO";
import { KafkaDTO } from "./KafkaDTO";

export abstract class EnvelopKafkaDTOMother {

    static ofEvent<E extends KafkaDTO>(event: E): EnvelopeKafkaDTO<E> {
        const now = new Date()
        
        const metadata = new MetadataKafkaDTO(
            event.constructor.name,
            now
        )

        return new EnvelopeKafkaDTO(
            metadata,
            event
        )
    }
}