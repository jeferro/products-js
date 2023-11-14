import { UsernameKafkaMapper } from './UsernameKafkaMapper'
import { UsernameMother } from 'jf-architecture'

describe(`${UsernameKafkaMapper.name}`, () => {
  let usernameKafkaMapper = new UsernameKafkaMapper()

  it('should map to dto', () => {
    const username = UsernameMother.one()

    const usernameDTO = usernameKafkaMapper.toDTO(username)
    const result = usernameKafkaMapper.toEntity(usernameDTO)

    expect(result).toStrictEqual(username)
  })

  it('should map to entity', () => {
    const usernameDTO = 'one-user'

    const username = usernameKafkaMapper.toEntity(usernameDTO)
    const result = usernameKafkaMapper.toDTO(username)

    expect(result).toStrictEqual(usernameDTO)
  })
})
