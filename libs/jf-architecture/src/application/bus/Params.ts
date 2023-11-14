
import { Auth } from '../../domain/auth/entities/Auth'
import { UserAuth } from '../../domain/auth/entities/UserAuth'
import { AnonymousAuth } from '../../domain/auth/entities/AnonymousAuth'
import { Username } from '../../domain/auth/entities/Username'
import { Value } from '../../domain/core/entities/Value'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class Params extends Value {
  constructor(readonly auth: Auth) {
    super()
  }

  get isExecutedByUser(): boolean {
    return this.auth instanceof UserAuth
  }

  get isExecutedByAnonymous(): boolean {
    return this.auth instanceof AnonymousAuth
  }

  get authUsername(): Username | undefined {
    if(this.auth instanceof UserAuth){
      const userAuth = this.auth as UserAuth

      return userAuth.username
    }

    return undefined
  }

  isExecutedByTheUser(username: Username): boolean {
    return username.equals(this.authUsername)
  }

}
