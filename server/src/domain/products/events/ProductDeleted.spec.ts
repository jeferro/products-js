import { ProductMother } from '../entities/Product.mother.spec'
import { ProductDeleted } from './ProductDeleted'

describe(`${ProductDeleted.name}`, () => {
  describe(`of`, () => {
    it('should create a new event', async () => {
      const product = ProductMother.oneEnabled()

      const expected = new ProductDeleted(
        product.updatedAt,
        product.updatedBy,
        product.id
      )

      const result = ProductDeleted.of(product)

      expect(result).toStrictEqual(expected)
    })
  })
})
