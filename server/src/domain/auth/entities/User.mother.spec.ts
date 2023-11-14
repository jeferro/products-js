import { User } from "./User"
import { Username, MetadataMother } from "jf-architecture"

export abstract class UserMother {

    static readonly ONE_PLAIN_PASSWORD = "user"

    static readonly TWO_PLAIN_PASSWORD = "user"

    static readonly ONE_ENCRYPTED_PASSWORD = "$2b$10$MKb9mHN7DrnjJayo70KSOu2aZa0N71DaN0xMJa.Vxgck14dCqC7BG"

    static readonly TWO_ENCRYPTED_PASSWORD = "$2b$10$MKb9mHN7DrnjJayo70KSOu2aZa0N71DaN0xMJa.Vxgck14dCqC7BG"

    static one(): User {
        const username = new Username('username-one')
        const metadata = MetadataMother.one()

        return new User(username,
            this.ONE_ENCRYPTED_PASSWORD,
            ['user'],
            metadata)
    }

    static two(): User {
        const username = new Username('username-two')
        const metadata = MetadataMother.one()

        return new User(username,
            this.TWO_ENCRYPTED_PASSWORD,
            ['user'],
            metadata)
    }
}