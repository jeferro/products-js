import { User } from './User'
import { UserMother } from './User.mother.spec'

describe(`${User.name}`, () => {
  describe(`verifyPassword`, () => {
    it('should verify correct password', async () => {
      const user = UserMother.one()
      
      const result = await user.verifyPassword(UserMother.ONE_PLAIN_PASSWORD)

      expect(result).toStrictEqual(true)
    })

    it('should not verify incorrect password', async () => {
      const user = UserMother.one()
      
      const result = await user.verifyPassword('wrong-password')

      expect(result).toStrictEqual(false)
    })
  })
})
