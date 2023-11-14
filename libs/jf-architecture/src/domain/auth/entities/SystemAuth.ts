import { Auth } from "./Auth"
import { Username } from "./Username"

export class SystemAuth extends Auth {

  static of(): SystemAuth {
    return new SystemAuth()
  }

  get who(): Username {
    return Username.of('system')
  }

  protected hasAllRoles(requiredRoles: string[]): boolean {
    return true
  }
}
