
export class ProductsConfiguration {
    constructor(
        readonly enabled: boolean,
        readonly groupId: string,
        readonly topic: string,
    ) { }

    static of(
        enabled: boolean,
        groupId: string,
        topic: string
    ): ProductsConfiguration {
        return new ProductsConfiguration(
            enabled,
            groupId,
            topic,
        )
    }
}