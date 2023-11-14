import { Username } from "./Username"
import { Auth } from "./Auth"

export class UserAuth extends Auth {

  constructor(
    readonly username: Username,
    readonly roles: string[]) {
    super()
  }

  static of(
    username: Username,
    roles: string[]
  ): UserAuth {
    return new UserAuth(username, roles)
  }

  get who(): Username {
    return this.username
  }

  protected hasAllRoles(requiredRoles: string[]): boolean {
    return requiredRoles.every(requiredRole => this.roles.includes(requiredRole))
  }
}
