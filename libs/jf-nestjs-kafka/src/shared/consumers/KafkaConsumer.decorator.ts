import { Class } from "jf-architecture"


export const KAFKA_CONSUMER_METADATA_KEY = '__kafka_consumer__'

export function KafkaConsumer(eventClasses: Class<any>[]): ClassDecorator {
  return (consumer: any) => {
    Reflect.defineMetadata(
      KAFKA_CONSUMER_METADATA_KEY,
      eventClasses,
      consumer,
    )
  }
}
