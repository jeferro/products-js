import { Injectable } from "@nestjs/common"
import { KafkaConverter } from "./KafkaConverter"

@Injectable()
export class KafkaJsonConverter extends KafkaConverter {
    serialize(value: any): string {
        return JSON.stringify(value)
    }

    deserialize(valueDTO: Buffer): Record<string, any> {
        return JSON.parse(valueDTO.toString())
    }
}