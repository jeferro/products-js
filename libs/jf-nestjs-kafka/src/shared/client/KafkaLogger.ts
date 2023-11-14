import { Logger } from "@nestjs/common"
import { LogEntry, logLevel } from "kafkajs"

export class KafkaLogger {
    private readonly logger: Logger = new Logger('Kafka')

    public log(entry: LogEntry) {
        switch (entry.level) {

            case logLevel.ERROR:
            case logLevel.NOTHING:
                return this.logger.error(entry.log.message)

            case logLevel.WARN:
                return this.logger.warn(entry.log.message)


            case logLevel.INFO:
                return this.logger.log(entry.log.message)

            case logLevel.DEBUG:
                return this.logger.debug(entry.log.message)
        }
    }
}