import { FakeTimeService, AuthMother, Metadata } from 'jf-architecture'
import { ProductDetail } from './ProductDetail'
import { Reviews } from './Reviews'
import { ProductDetailMohther } from './ProductDetail.mother.spec'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'


describe(`${ProductDetail.name}`, () => {
  describe(`new`, () => {
    it('should create a product detail', async () => {
      const userAuth = AuthMother.oneUserAuth()
      const productId = ProductIdMother.one()
      const title = 'title of new product'
      const description = 'description of new product'
      const enabled = true
      const ocurredOn = new Date()

      const now = FakeTimeService.configureOneMinuteLater()

      const result = ProductDetail.new(
        userAuth,
        productId,
        title,
        description,
        enabled,
        ocurredOn
      )

      const expectedMetadata = new Metadata(
        userAuth.username,
        now,
        userAuth.username,
        now
      )

      const expected = new ProductDetail(
        productId,
        title,
        description,
        enabled,
        ocurredOn,
        ocurredOn,
        Reviews.empty(),
        expectedMetadata
      )

      expect(result).toStrictEqual(expected)
    })
  })

  describe(`updateInfo`, () => {
    it('should update information of product detail', async () => {
      const productDetail = ProductDetailMohther.one()

      const now = FakeTimeService.configureOneMinuteLater()

      const userAuth = AuthMother.oneUserAuth()
      const newTitle = 'new product'
      const newDescription = 'new description'
      const ocurredOn = new Date()
      productDetail.updateInfo(
        userAuth,
        newTitle,
        newDescription,
        ocurredOn
      )

      expect(productDetail.title).toEqual(newTitle)
      expect(productDetail.description).toEqual(newDescription)
      expect(productDetail.infoOccurredOn).toEqual(ocurredOn)

      expect(productDetail.updatedBy).toEqual(userAuth.username)
      expect(productDetail.updatedAt).toEqual(now)
    })
  })

  describe(`changeActivation`, () => {
    it('should change activation of product detail', async () => {
      const productDetail = ProductDetailMohther.one()

      const now = FakeTimeService.configureOneMinuteLater()

      const userAuth = AuthMother.oneUserAuth()
      const newEnabled = false
      const ocurredOn = new Date()
      productDetail.changeActivation(
        userAuth,
        newEnabled,
        ocurredOn
      )

      expect(productDetail.isEnabled).toEqual(newEnabled)
      expect(productDetail.activationOccurredOn).toEqual(ocurredOn)

      expect(productDetail.updatedBy).toEqual(userAuth.username)
      expect(productDetail.updatedAt).toEqual(now)
    })
  })
})
