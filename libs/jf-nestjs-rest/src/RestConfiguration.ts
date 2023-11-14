
export class RestConfiguration {
    constructor(
        readonly secret: string,
        readonly expiresIn: string
    ) { }

    static of(
        secret: string,
        expiresIn: string
    ): RestConfiguration {
        return new RestConfiguration(secret,
            expiresIn)
    }
}