
export class AuthConfiguration {
    constructor(
        readonly enabled: boolean
    ) { }

    static of(enabled: boolean): AuthConfiguration {
        return new AuthConfiguration(enabled)
    }
}