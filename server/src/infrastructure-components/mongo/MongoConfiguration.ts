export class MongoConfiguration {

    constructor(readonly uri: string) { }

    static of(uri: string): MongoConfiguration {
        return new MongoConfiguration(uri)
    }
}