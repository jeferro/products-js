import { SimpleIdentifier } from "../../core/entities/SimpleIdentier"

export class Username extends SimpleIdentifier<string> {

    static of(value: string): Username {
        return new Username(value)
    }
}