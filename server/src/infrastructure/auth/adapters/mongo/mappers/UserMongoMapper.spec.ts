import { UserMongoDTOMother } from 'src/infrastructure-components/mongo/auth/dtos/UserMongoDTO.mother.spec'
import { UserMongoMapper } from './UserMongoMapper'
import { UserMother } from 'src/domain/auth/entities/User.mother.spec'

describe(`${UserMongoMapper.name}`, () => {
  let userMongoMapper = new UserMongoMapper()

  it('should map to entity', () => {
    const userDTO = UserMongoDTOMother.one()

    const user = userMongoMapper.toEntity(userDTO)
    const result = userMongoMapper.toDTO(user)

    expect(result).toStrictEqual(userDTO)
  })

  it('should map to dto', () => {
    const user = UserMother.one()

    const userDTO = userMongoMapper.toDTO(user)
    const result = userMongoMapper.toEntity(userDTO)

    expect(result).toStrictEqual(user)
  })
})
