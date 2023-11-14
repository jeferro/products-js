import { AuthMother, CommandBus, UserAuth } from 'jf-architecture'
import { AuthRestController } from './AuthRestController'
import { mockInterface } from 'jf-mocks'
import { RestAuthService, AuthRestDTO } from 'jf-nestjs-rest'
import { SignInRestInput } from 'src/infrastructure-components/rest/auth/inputs/SignInUserRestInput'
import { SignIn } from 'src/application/auth/commands/SignIn'
import { AuthRestMapper } from './mappers/AuthRestMapper'
import { UsernameRestMapper } from 'src/infrastructure/shared/adapters/rest/mappers/UsernameRestMapper'


describe(`${AuthRestController.name}`, () => {
  const authRestMapper = new AuthRestMapper()

  const usernameRestMapper = new UsernameRestMapper()

  const restAuthService = mockInterface<RestAuthService>()

  const commandBus = mockInterface<CommandBus>()

  const authRestController = new AuthRestController(
    restAuthService,
    commandBus
  )

  beforeEach(() => {
    commandBus.execute.mockReset()
  })

  it('should sign in the user', async () => {
    const expected = AuthMother.oneUserAuth()
    commandBus.execute.mockResolvedValue(expected)

    const authDTO = undefined
    const inputDTO = new SignInRestInput(
      'one-user',
      'password'
    )

    const result = await authRestController.onSignIn(
      authDTO,
      inputDTO
    )

    checkSignInCommand(
      commandBus.execute.mock.calls[0][0] as SignIn,
      authDTO,
      inputDTO
    )

    checkSignInResult(
      result,
      expected
    )
  })

  function checkSignInCommand(
    signIn: SignIn,
    authDTO: AuthRestDTO | undefined,
    inputDTO: SignInRestInput
  ) {
    expect(signIn.auth).toEqual(authRestMapper.toEntity(authDTO))
    expect(signIn.username).toEqual(usernameRestMapper.toEntity(inputDTO.username))
    expect(signIn.plainPassword).toEqual(inputDTO.password)
  }

  function checkSignInResult(
    result: AuthRestDTO,
    expected: UserAuth
  ) {
    expect(result).toEqual(authRestMapper.toDTO(expected))
  }

})
