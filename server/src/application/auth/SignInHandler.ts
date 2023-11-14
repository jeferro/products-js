import {
  LoggerCreator,
  AuthenticationException,
  BaseCommandHandler,
  CommandHandler,
  UserAuth,
  Username
} from 'jf-architecture'
import { SignIn } from './commands/SignIn'
import { User } from 'src/domain/auth/entities/User'
import { UsersRepository } from 'src/domain/auth/repository/UsersRepository'

@CommandHandler(SignIn)
export class SignInHandler extends BaseCommandHandler<SignIn, UserAuth> {
  constructor(
    loggerCreator: LoggerCreator,
    private readonly userRepository: UsersRepository,
  ) {
    super(User, loggerCreator)
  }

  protected async handle(params: SignIn): Promise<UserAuth> {
    let user = await this.findByAuthenticatedUser(params.authUsername)

    if (user) {
      return UserAuth.of(user.username, user.roles)
    }

    user = await this.userRepository.findByUsername(params.username)

    if (!user) {
      throw AuthenticationException.ofUsernameNotFound()
    }

    if (! await user.verifyPassword(params.plainPassword)) {
      throw AuthenticationException.ofIncorrectPassword()
    }

    return UserAuth.of(user.username, user.roles)
  }

  private async findByAuthenticatedUser(username: Username | undefined): Promise<User | undefined> {
    if (!username) {
      return undefined
    }

    return await this.userRepository.findByUsername(username)
  }
}
