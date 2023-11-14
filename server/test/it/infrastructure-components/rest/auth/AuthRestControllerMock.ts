import { AuthRestControllerSpec } from "src/infrastructure-components/rest/auth/AuthRestControllerSpec"
import { SignInRestInput } from "src/infrastructure-components/rest/auth/inputs/SignInUserRestInput"
import { AuthRestDTO } from "jf-nestjs-rest"

export class AuthRestControllerMock extends AuthRestControllerSpec {

    readonly onSignInMock = jest.fn()

    async onSignIn(
        authDTO: AuthRestDTO | undefined,
        input: SignInRestInput
    ): Promise<AuthRestDTO> {
        return this.onSignInMock(authDTO, input)
    }
}