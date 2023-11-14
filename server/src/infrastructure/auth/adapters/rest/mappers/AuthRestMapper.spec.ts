import { AuthRestMapper } from './AuthRestMapper'
import { UserAuth, AuthMother } from 'jf-architecture'
import { AuthRestDTOMother } from 'jf-nestjs-rest'

describe(`${AuthRestMapper.name}`, () => {
  let authRestMapper = new AuthRestMapper()

  it('should map to dto', () => {
    const userAuth = AuthMother.oneUserAuth()

    const userAuthDTO = authRestMapper.toDTO(userAuth)
    const result = authRestMapper.toEntity(userAuthDTO)

    expect(result).toStrictEqual(userAuth)
  })

  it('should map to entity', () => {
    const userAuthDTO = AuthRestDTOMother.one()

    const userAuth = authRestMapper.toEntity(userAuthDTO) as UserAuth
    const result = authRestMapper.toDTO(userAuth)

    expect(result).toStrictEqual(userAuthDTO)
  })
})
