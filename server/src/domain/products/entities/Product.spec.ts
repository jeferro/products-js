import { FakeTimeService, AuthMother, Metadata } from 'jf-architecture'
import { ProductMother } from './Product.mother.spec'
import { Product } from './Product'
import { ProductIdMother } from './ProductId.mother.spec'
import { ProductCreated } from '../events/ProductCreated'
import { DisabledProductException } from '../exceptions/DisabledProductException'


describe(`${Product.name}`, () => {
  describe(`new`, () => {
    it('should create an enabled product', async () => {
      const userAuth = AuthMother.oneUserAuth()
      const productId = ProductIdMother.one()
      const title = 'title of new product'
      const description = 'description of new product'

      const now = FakeTimeService.configureOneMinuteLater()

      const result = Product.new(
        userAuth,
        productId,
        title,
        description
      )

      const expectedMetadata = new Metadata(
        userAuth.username,
        now,
        userAuth.username,
        now
      )

      const expected = new Product(
        productId,
        title,
        description,
        true,
        expectedMetadata
      )

      expected.domainEvents.record(
        ProductCreated.of(expected)
      )

      expect(result).toEqual(expected)
    })
  })

  describe(`update`, () => {
    it('should update information of product', async () => {
      const userAuth = AuthMother.oneUserAuth()
      const enabledProduct = ProductMother.oneEnabled()

      const now = FakeTimeService.configureOneMinuteLater()

      const newTitle = 'new product'
      const newDescription = 'new description'
      enabledProduct.update(
        userAuth,
        newTitle,
        newDescription
      )

      expect(enabledProduct.title).toEqual(newTitle)
      expect(enabledProduct.description).toEqual(newDescription)

      expect(enabledProduct.updatedBy).toEqual(userAuth.username)
      expect(enabledProduct.updatedAt).toEqual(now)
    })
  })

  describe(`update`, () => {
    it('should throw exception when we try to update a disabled product', async () => {
      const userAuth = AuthMother.oneUserAuth()
      const enabledProduct = ProductMother.oneDisabled()

      const now = FakeTimeService.configureOneMinuteLater()

      const newTitle = 'new product'
      const newDescription = 'new description'

      try {
        enabledProduct.update(
          userAuth,
          newTitle,
          newDescription
        )

        fail()
      }
      catch (cause) {
        expect(cause).toBeInstanceOf(DisabledProductException)
      }
    })
  })

  describe(`disable`, () => {
    it('should disable product', async () => {
      const userAuth = AuthMother.oneUserAuth()
      const enabledProduct = ProductMother.oneEnabled()

      const now = FakeTimeService.configureOneMinuteLater()

      enabledProduct.changeActivation(
        userAuth,
        false
      )

      expect(enabledProduct.isDisabled).toEqual(true)

      expect(enabledProduct.updatedBy).toEqual(userAuth.username)
      expect(enabledProduct.updatedAt).toEqual(now)
    })
  })

  describe(`enable`, () => {
    it('should enable product', async () => {
      const userAuth = AuthMother.oneUserAuth()
      const disabledProduct = ProductMother.oneDisabled()

      const now = FakeTimeService.configureOneMinuteLater()

      disabledProduct.changeActivation(
        userAuth,
        true
      )

      expect(disabledProduct.isEnabled).toEqual(true)

      expect(disabledProduct.updatedBy).toEqual(userAuth.username)
      expect(disabledProduct.updatedAt).toEqual(now)
    })
  })

  describe(`delete`, () => {
    it('should delete enabled product', async () => {
      const userAuth = AuthMother.oneUserAuth()
      const enabledProduct = ProductMother.oneEnabled()

      const now = FakeTimeService.configureOneMinuteLater()

      enabledProduct.delete(userAuth)

      expect(enabledProduct.updatedBy).toEqual(userAuth.username)
      expect(enabledProduct.updatedAt).toEqual(now)
    })

    it('should delete disabled product', async () => {
      const userAuth = AuthMother.oneUserAuth()
      const disabledProduct = ProductMother.oneDisabled()

      const now = FakeTimeService.configureOneMinuteLater()

      disabledProduct.delete(userAuth)

      expect(disabledProduct.updatedBy).toEqual(userAuth.username)
      expect(disabledProduct.updatedAt).toEqual(now)
    })
  })
})
