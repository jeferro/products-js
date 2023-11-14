import { Aggregate, Username, Metadata } from "jf-architecture"
import * as bcrypt from "bcrypt"

export class User extends Aggregate<Username> {

    private static readonly SALT_ROUNDS = 10

    private _encryptedPassword: string

    constructor(
        username: Username,
        encryptedPassword: string,
        readonly roles: string[],
        metadata: Metadata) {
        super(username, metadata)

        this._encryptedPassword = encryptedPassword
    }

    get username(): Username {
        return this.id
    }

    get encryptedPassword(): string {
        return this._encryptedPassword
    }

    async verifyPassword(plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, this._encryptedPassword)
    }

    get privateAttributeNames(): string[] {
      return [
        'encryptedPassword'
      ]
    }
}