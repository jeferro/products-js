import { Injectable } from "@nestjs/common"
import { EnvelopeKafkaDTO } from "../dtos/EnvelopeKafkaDTO"
import { KAFKA_CONSUMER_METADATA_KEY } from "./KafkaConsumer.decorator"
import { Class } from "jf-architecture"

@Injectable()
export abstract class BaseKafkaConsumer {

    abstract get topic(): string

    abstract get groupId(): string

    abstract consume(envelope: EnvelopeKafkaDTO<any>): Promise<void>

    getEventClassFromName(
        typeName: string
    ): Class<any> | undefined {        
        const prototype = Object.getPrototypeOf(this)

        const eventClasses: Class<any>[] = Reflect.getMetadata(KAFKA_CONSUMER_METADATA_KEY, prototype.constructor)

        if (!eventClasses) {
            throw new Error(`The consumer ${prototype.constructor.name} hasn't the payload classes metadata`)
        }

        return eventClasses.find((eventClass) => eventClass.name === typeName)
    }
}