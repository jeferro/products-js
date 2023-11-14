import { AuthRestDTO } from "./AuthRestDTO"

export abstract class AuthRestDTOMother {

    static one(): AuthRestDTO {
        return new AuthRestDTO('userone', ['user'])
    }
}