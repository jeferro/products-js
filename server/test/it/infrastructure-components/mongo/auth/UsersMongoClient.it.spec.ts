import { MongoRepositoryTestBootstraper } from '../MongoRepositoryTestBootstraper'
import { UsersMongoClient } from 'src/infrastructure-components/mongo/auth/UsersMongoClient'

describe(`${UsersMongoClient.name} (e2e)`, () => {
  let testBootstraper = new MongoRepositoryTestBootstraper()

  let usersMongoClient: UsersMongoClient

  beforeAll(async () => {
    usersMongoClient = await testBootstraper.start(
      UsersMongoClient,
      `${__dirname}/initdb/test-users.js`
    )
  })

  afterAll(async () => {
    await testBootstraper.stop()
  })

  describe('Find by username', () => {
    it('should return undefined when user does not exist', async () => {
      const usernameDTO = 'wrong-username'

      const userDTO = await usersMongoClient.findByUsername(usernameDTO)

      expect(userDTO).toBeUndefined()
    })

    it('should return an user when user exists', async () => {
      const usernameDTO = 'username'

      const userDTO = await usersMongoClient.findByUsername(usernameDTO)

      expect(userDTO).not.toBeUndefined()
      expect(userDTO?.username).toStrictEqual(usernameDTO)
    })
  })

})
