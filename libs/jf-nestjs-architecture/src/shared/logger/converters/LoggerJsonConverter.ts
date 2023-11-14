import { 
    Auth, 
    Aggregate, 
    CollectionEntity, 
    CollectionValue, 
    SimpleIdentifier, 
    SimpleValue,
    Value
} from "jf-architecture"

export class LoggerJsonConverter {

    static convert(data: any): string {
        const exportation = data instanceof Object
            ? this.convertObject(data)
            : this.convertValue(data)

        return JSON.stringify(exportation)
    }

    private static convertObject(object: object): Record<string, any> {
        const exportation = {}
        const privateAttributeNames = object instanceof Value
            ? object.privateAttributeNames
            : []

        if( object instanceof Aggregate){
            privateAttributeNames.push("_domainEvents")
        }

        Object.getOwnPropertyNames(object)
            .filter(attributeName => !privateAttributeNames.includes(attributeName))
            .forEach(attributeName => {
                const attributeValue = object[attributeName]

                exportation[attributeName] = this.convertValue(attributeValue)
            })

        return exportation
    }

    private static convertValue(value: any): any {
        if (value instanceof SimpleValue) {
            return value.value
        }

        if (value instanceof SimpleIdentifier) {
            return value.value
        }

        if (value instanceof Auth) {
            return value.who.value
        }

        if (value instanceof Date) {
            return value.toISOString()
        }

        if (value instanceof CollectionValue) {
            return value.map(item => this.convertValue(item))
        }

        if (value instanceof CollectionEntity) {
            return value.map(item => this.convertValue(item))
        }

        if (value instanceof Array) {
            return value.map(item => this.convertValue(item))
        }

        if (value instanceof Set) {
            const entries = Array.from(value.entries())

            return entries.map(item => this.convertValue(item))
        }

        if (value instanceof Object) {
            return this.convertObject(value)
        }

        return value
    }
}