
export abstract class KafkaConverter {

    abstract serialize(value: any): string

    abstract deserialize(valueDTO: Buffer): Record<string, any>
}