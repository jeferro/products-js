import { ProductMother } from '../entities/Product.mother.spec'
import { ProductCreated } from './ProductCreated'

describe(`${ProductCreated.name}`, () => {
  describe(`of`, () => {
    it('should create a new event', async () => {
      const product = ProductMother.oneEnabled()

      const expected = new ProductCreated(
        product.updatedAt,
        product.updatedBy,
        product.id,
        product.title,
        product.description,
        product.isEnabled
      )

      const result = ProductCreated.of(product)

      expect(result).toStrictEqual(expected)
    })
  })
})
