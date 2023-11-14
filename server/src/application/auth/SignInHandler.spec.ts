import 'reflect-metadata'

import {
  LoggerCreator,
  Logger, 
  AuthMother, 
  AuthenticationException, 
  UsernameMother, 
  UserAuth
} from 'jf-architecture'
import { Mock, mockInterface } from 'jf-mocks'
import { SignInHandler } from './SignInHandler'
import { UsersInMemoryRepository } from 'src/infrastructure/auth/adapters/in-memory/UsersInMemoryRepository'
import { SignIn } from './commands/SignIn'
import { UserMother } from 'src/domain/auth/entities/User.mother.spec'
import { User } from 'src/domain/auth/entities/User'

describe(`${SignInHandler.name}`, () => {
  let logger: Mock<Logger>

  let loggerCreator: Mock<LoggerCreator>

  let userInMemoryRepository: UsersInMemoryRepository

  let signInHandler: SignInHandler

  beforeAll(async () => {
    logger = mockInterface<Logger>()
    loggerCreator = mockInterface<LoggerCreator>()
    loggerCreator.ofObject.mockReturnValue(logger)

    userInMemoryRepository = new UsersInMemoryRepository()

    signInHandler = new SignInHandler(
      loggerCreator,
      userInMemoryRepository,
    )
  })

  it('should sign in an anonymous user', async () => {
    const expected = UserMother.one()
    userInMemoryRepository.reset(expected)

    const command = new SignIn(
      AuthMother.oneAnonymousAuth(),
      expected.username,
      UserMother.ONE_PLAIN_PASSWORD
    )

    const result = await signInHandler.execute(command)

    checkUserAuth(
      result,
      expected
    )
  })

  it('should sign in an already authenticated user', async () => {
    const expected = UserMother.one()
    const other = UserMother.two()
    userInMemoryRepository.reset(
      expected,
      other
    )

    const command = new SignIn(
      AuthMother.oneAuthOfUser(expected.username),
      other.username,
      UserMother.TWO_PLAIN_PASSWORD)

    const result = await signInHandler.execute(command)

    checkUserAuth(
      result,
      expected
    )
  })

  it('should throw exception when user does not exist', async () => {
    userInMemoryRepository.reset()

    const username = UsernameMother.one()
    const command = new SignIn(
      AuthMother.oneAnonymousAuth(),
      username,
      UserMother.ONE_PLAIN_PASSWORD
    )

    await expect(signInHandler.execute(command))
      .rejects
      .toThrowError(AuthenticationException)
  })

  it('should throw exception when password is incorrect', async () => {
    const user = UserMother.one()
    userInMemoryRepository.reset()

    const command = new SignIn(
      AuthMother.oneAnonymousAuth(),
      user.username,
      'wrong-password'
    )

    await expect(signInHandler.execute(command))
      .rejects
      .toThrowError(AuthenticationException)
  })
})


function checkUserAuth(
  result: UserAuth,
  user: User
) {
  expect(result.username).toStrictEqual(user.username)
  expect(result.roles).toStrictEqual(user.roles)
}
