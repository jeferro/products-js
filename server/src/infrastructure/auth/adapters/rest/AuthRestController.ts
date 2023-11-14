import { SignIn } from "src/application/auth/commands/SignIn"
import { Controller } from "@nestjs/common"
import { CommandBus, UserAuth } from "jf-architecture"
import { AuthRestMapper } from "src/infrastructure/auth/adapters/rest/mappers/AuthRestMapper"
import { RestAuthService, AuthRestDTO } from "jf-nestjs-rest"
import { SignInRestInput } from "src/infrastructure-components/rest/auth/inputs/SignInUserRestInput"
import { UsernameRestMapper } from "src/infrastructure/shared/adapters/rest/mappers/UsernameRestMapper"
import { AuthRestControllerSpec } from "src/infrastructure-components/rest/auth/AuthRestControllerSpec"

@Controller()
export class AuthRestController extends AuthRestControllerSpec {

  private readonly authRestMapper = new AuthRestMapper()

  private readonly usernameRestMapper = new UsernameRestMapper()

  constructor(
    restAuthService: RestAuthService,
    private readonly commandBus: CommandBus,
  ) {
    super(restAuthService)
  }

  async onSignIn(
    authDTO: AuthRestDTO | undefined,
    input: SignInRestInput
  ): Promise<AuthRestDTO> {
    const command = new SignIn(
      this.authRestMapper.toEntity(authDTO),
      this.usernameRestMapper.toEntity(input.username),
      input.password
    )

    const auth = await this.commandBus.execute<UserAuth>(command)

    return this.authRestMapper.toDTO(auth)
  }

}