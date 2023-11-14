
export class ProductDetailsConfiguration {
    constructor(
        readonly enabled: boolean,
        readonly groupId: string,
        readonly productsTopic: string,
    ) { }

    static of(
        enabled: boolean,
        groupId: string,
        productsTopic: string,
    ): ProductDetailsConfiguration {
        return new ProductDetailsConfiguration(
            enabled,
            groupId,
            productsTopic
        )
    }
}