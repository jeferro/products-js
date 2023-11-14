import { Username } from "./Username"

export abstract class UsernameMother {

    static one(): Username {
        return new Username('username-one')
    }

    static two(): Username {
        return new Username('username-two')
    }
}