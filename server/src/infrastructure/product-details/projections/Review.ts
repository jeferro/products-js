import { Username, Value } from "jf-architecture"

export class Review extends Value {

    constructor(
        readonly ownerId: Username,
        readonly comment: string
    ) {
        super()
    }
}