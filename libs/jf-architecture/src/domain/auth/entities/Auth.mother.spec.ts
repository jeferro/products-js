import { Username } from "./Username"
import { AnonymousAuth } from "./AnonymousAuth"
import { UserAuth } from "./UserAuth"

export abstract class AuthMother {

    static oneUserAuth(): UserAuth {
        const username = new Username('user-one')

        return UserAuth.of(username, ['user'])
    }

    static oneAuthOfUser(username: Username): UserAuth {
        return UserAuth.of(username, ['user'])
    }

    static oneAnonymousAuth(): AnonymousAuth {        
        return AnonymousAuth.of()
    }
}