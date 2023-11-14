import { HttpStatus } from '@nestjs/common'
import { RestControllerTestBootstraper } from '../RestControllerTestBootstraper'
import { AuthRestControllerSpec } from 'src/infrastructure-components/rest/auth/AuthRestControllerSpec'
import { AuthRestControllerMock } from './AuthRestControllerMock'
import { AuthRestDTOMother, AuthRestDTO } from 'jf-nestjs-rest'
import { SignInRestInput } from 'src/infrastructure-components/rest/auth/inputs/SignInUserRestInput'


describe(`${AuthRestControllerSpec.name} (e2e)`, () => {
  let testBootstraper = new RestControllerTestBootstraper()

  let authRestControllerMock: AuthRestControllerMock

  beforeAll(async () => {
    authRestControllerMock = await testBootstraper.start(
      AuthRestControllerMock
    )
  })

  afterAll(async () => {
    await testBootstraper.stop()
  })

  describe('Sign In', () => {
    it('should sign in user', async () => {
      const expectedAuthDTO = AuthRestDTOMother.one()
      authRestControllerMock.onSignInMock.mockResolvedValue(expectedAuthDTO)

      const inputDTO = new SignInRestInput(
        'one-username',
        'password'
      )

      return testBootstraper.post(`/authentications`)
        .send(inputDTO)
        .expect(HttpStatus.CREATED)
        .then((response) => {
          checkSignInParams(
            authRestControllerMock.onSignInMock.mock.calls[0],
            inputDTO
          )

          checkSignInResult(
            response.body,
            expectedAuthDTO
          )
        })
    })
  })

  function checkSignInParams(
    data: any[],
    expectedInputDTO: SignInRestInput
  ) {
    expect(data[0]).toBeUndefined()
    expect(data[1]).toEqual(expectedInputDTO)
  }

  function checkSignInResult(
    data: Record<string, any>,
    expected: AuthRestDTO
  ) {
    expect(data.username).toEqual(expected.username)
    expect(data.roles).toEqual(expected.roles)
  }
})
