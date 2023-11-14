import { ProductId } from './ProductId'
import { ValueException } from 'jf-architecture'

describe(`${ProductId.name}`, () => {
  
  describe(`constructor`, () => {
    it('should create id with value', async () => {
      const value = 'one-product-id'
      const result = new ProductId(value)

      expect(result.value).toEqual(value)
    })

    it('should fail when value is empty', async () => {
      expect(() => new ProductId(''))
        .toThrowError(ValueException)
    })
  })
})
