import { RestDTO } from "jf-nestjs-rest"

export class ReviewRestDTO extends RestDTO {

    constructor(
        readonly ownerId: string,
        readonly comment: string
    ) {
        super()
    }
}