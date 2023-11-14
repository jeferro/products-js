import { ProductMother } from '../entities/Product.mother.spec'
import { ProductUpdated } from './ProductUpdated'

describe(`${ProductUpdated.name}`, () => {
  describe(`of`, () => {
    it('should create a new event', async () => {
      const product = ProductMother.oneEnabled()

      const expected = new ProductUpdated(
        product.updatedAt,
        product.updatedBy,
        product.id,
        product.title,
        product.description
      )

      const result = ProductUpdated.of(product)

      expect(result).toStrictEqual(expected)
    })
  })
})
