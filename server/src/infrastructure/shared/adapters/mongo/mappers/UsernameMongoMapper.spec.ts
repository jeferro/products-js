import { UsernameMother } from 'jf-architecture'
import { UsernameMongoMapper } from './UsernameMongoMapper'

describe(`${UsernameMongoMapper.name}`, () => {
  let usernameMongoMapper = new UsernameMongoMapper()

  it('should map to entity', () => {
    const usernameDTO = 'user-one'

    const usernname = usernameMongoMapper.toEntity(usernameDTO)
    const result = usernameMongoMapper.toDTO(usernname)

    expect(result).toEqual(usernameDTO)
  })

  it('should map to dto', () => {
    const username = UsernameMother.one()

    const usernameDTO = usernameMongoMapper.toDTO(username)
    const result = usernameMongoMapper.toEntity(usernameDTO)

    expect(result).toStrictEqual(username)
  })
})
