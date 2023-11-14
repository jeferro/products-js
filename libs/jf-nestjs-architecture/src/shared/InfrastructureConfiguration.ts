
export class InfrastructureConfiguration {
    constructor(
        readonly port: number,
        readonly logQueries: boolean
    ) { }

    static of(
        port: number,
        logQueries: boolean
    ): InfrastructureConfiguration {
        return new InfrastructureConfiguration(
            port,
            logQueries
        )
    }
}