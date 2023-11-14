import { ProductMother } from './Product.mother.spec'
import { Products } from './Products'

describe(`${Products.name}`, () => {
  describe(`create`, () => {
    it('should create with dynamic parameters', async () => {
      const oneProduct = ProductMother.oneEnabled()
      const twoProduct = ProductMother.twoEnabled()

      const products = Products.of(oneProduct, twoProduct)

      expect(products.length).toEqual(2)
      expect(products.includes(oneProduct)).toEqual(true)
      expect(products.includes(twoProduct)).toEqual(true)
    })

    it('should create from array', async () => {
      const oneProduct = ProductMother.oneEnabled()
      const twoProduct = ProductMother.twoEnabled()

      const products = Products.ofArray([oneProduct, twoProduct])

      expect(products.length).toEqual(2)
      expect(products.includes(oneProduct)).toEqual(true)
      expect(products.includes(twoProduct)).toEqual(true)
    })
  })
})
