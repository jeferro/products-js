
export abstract class BooleanUtil {

    static getBoolean(value: boolean | undefined, defaultValue: boolean): boolean {
        if (value === undefined) {
            return defaultValue
        }

        return value
    }
}