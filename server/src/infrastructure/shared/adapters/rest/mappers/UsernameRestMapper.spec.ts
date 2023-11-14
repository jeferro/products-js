import { UsernameMother } from 'jf-architecture'
import { UsernameRestMapper } from './UsernameRestMapper'

describe(`${UsernameRestMapper.name}`, () => {
  let usernameRestMapper = new UsernameRestMapper()

  it('should map to dto', () => {
    const username = UsernameMother.one()

    const usernameDTO = usernameRestMapper.toDTO(username)
    const result = usernameRestMapper.toEntity(usernameDTO)

    expect(result).toStrictEqual(username)
  })

  it('should map to entity', () => {
    const usernameDTO = 'userone'

    const username = usernameRestMapper.toEntity(usernameDTO)
    const result = usernameRestMapper.toDTO(username)

    expect(result).toStrictEqual(usernameDTO)
  })
})
