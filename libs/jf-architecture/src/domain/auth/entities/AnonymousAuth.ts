import { Auth } from "./Auth"
import { Username } from "./Username"

export class AnonymousAuth extends Auth {

  static of(): AnonymousAuth {
    return new AnonymousAuth()
  }

  get who(): Username {
    return Username.of('anonymous')
  }

  protected hasAllRoles(requiredRoles: string[]): boolean {
    return false
  }
}
