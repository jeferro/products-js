import { mockClass } from 'jf-mocks'
import { UsersMongoRepository } from './UsersMongoRepository'
import { UsersMongoClient } from 'src/infrastructure-components/mongo/auth/UsersMongoClient'
import { UsernameMongoMapper } from 'src/infrastructure/shared/adapters/mongo/mappers/UsernameMongoMapper'
import { UserMongoMapper } from './mappers/UserMongoMapper'
import { UserMongoDTOMother } from 'src/infrastructure-components/mongo/auth/dtos/UserMongoDTO.mother.spec'
import { Username, UsernameMother } from 'jf-architecture'
import { User } from 'src/domain/auth/entities/User'
import { UserMongoDTO } from 'src/infrastructure-components/mongo/auth/dtos/UserMongoDTO'


describe(`${UsersMongoRepository.name}`, () => {
  const usernameMongoMapper = new UsernameMongoMapper()

  const userMongoMapper = new UserMongoMapper()

  const usersMongoClient = mockClass(UsersMongoClient)

  const usersMongoRepository = new UsersMongoRepository(
    usersMongoClient
  )

  it('should find user by username', async () => {
    const expectedDTO = UserMongoDTOMother.one()
    usersMongoClient.findByUsername.mockResolvedValue(expectedDTO)

    const username = UsernameMother.one()

    const result = await usersMongoRepository.findByUsername(username)

    checkFindByUsernameParams(
      usersMongoClient.findByUsername.mock.calls[0],
      username
    )

    checkUserResult(
      result,
      expectedDTO
    )
  })

  function checkFindByUsernameParams(
    params: any[],
    username: Username
  ) {
    expect(params[0]).toEqual(usernameMongoMapper.toDTO(username))
  }

  function checkUserResult(
    result: User | undefined,
    expectedDTO: UserMongoDTO
  ) {
    expect(result).toEqual(userMongoMapper.toEntity(expectedDTO))
  }

})
