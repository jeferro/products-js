
export class KafkaConfiguration {

    constructor(
        readonly clientId: string,
        readonly brokers: string[]
    ) { }

    static of(
        clientId: string,
        brokers: string[]
    ): KafkaConfiguration {
        return new KafkaConfiguration(
            clientId,
            brokers
        )
    }
}