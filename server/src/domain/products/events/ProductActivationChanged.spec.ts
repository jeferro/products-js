import { ProductMother } from '../entities/Product.mother.spec'
import { ProductActivationChanged } from './ProductActivationChanged'

describe(`${ProductActivationChanged.name}`, () => {

  describe(`of`, () => {
    
    it('should create a new enabled event', async () => {
      const product = ProductMother.oneEnabled()

      const expected = new ProductActivationChanged(
        product.updatedAt,
        product.updatedBy,
        product.id,
        product.isEnabled
      )

      const result = ProductActivationChanged.of(product)

      expect(result).toStrictEqual(expected)
    })
  })
})
