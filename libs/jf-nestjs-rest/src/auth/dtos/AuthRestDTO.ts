import { RestDTO } from "../../shared/dtos/RestDTO"


export class AuthRestDTO extends RestDTO {
    constructor(
        readonly username: string,
        readonly roles: string[]
    ) {
        super()
    }
}