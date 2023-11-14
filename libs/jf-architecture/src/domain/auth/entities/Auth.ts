import { Value } from "../../core/entities/Value"
import { Username } from "./Username"

export abstract class Auth extends Value {

    abstract get who(): Username

    hasPermissions(requiredRoles: string[]): boolean {
        if(requiredRoles.length == 0){
            return true
        }

        return this.hasAllRoles(requiredRoles)
    }

    protected abstract hasAllRoles(requiredRoles: string[]): boolean
}
