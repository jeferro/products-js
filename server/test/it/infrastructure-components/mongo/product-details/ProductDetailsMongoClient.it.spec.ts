
import { MongoRepositoryTestBootstraper } from '../MongoRepositoryTestBootstraper'
import { ProductDetailsMongoClient } from 'src/infrastructure-components/mongo/product-details/ProductDetailsMongoClient'
import { ProductDetailMongoDTOMother } from 'src/infrastructure-components/mongo/product-details/dtos/ProductDetailMongoDTO.mother.spec'

describe(`${ProductDetailsMongoClient.name} (e2e)`, () => {
  let testBootstraper = new MongoRepositoryTestBootstraper()

  let productDetailsMongoClient: ProductDetailsMongoClient

  beforeAll(async () => {
    productDetailsMongoClient = await testBootstraper.start(
      ProductDetailsMongoClient,
      `${__dirname}/initdb/test-product-details.js`
    )
  })

  afterAll(async () => {
    await testBootstraper.stop()
  })

  describe('Find by id', () => {
    it('should return undefined when product detail does not exist', async () => {
      const productDetailIdDTO = 'wrong-id'

      const productDetailDTO = await productDetailsMongoClient.findById(productDetailIdDTO)

      expect(productDetailDTO).toBeUndefined()
    })

    it('should return an product detail when it exists', async () => {
      const productDetailIdDTO = 'one-product'

      const productDetailDTO = await productDetailsMongoClient.findById(productDetailIdDTO)

      expect(productDetailDTO).not.toBeUndefined()
      expect(productDetailDTO?._id).toEqual(productDetailIdDTO)
    })
  })

  describe('Save', () => {
    it('should save the product', async () => {
      const expectedDTO = ProductDetailMongoDTOMother.one()

      await productDetailsMongoClient.save(expectedDTO)

      const resultDTO = await productDetailsMongoClient.findById(expectedDTO._id)

      expect(resultDTO).toStrictEqual(expectedDTO)
    })
  })

  describe('Delete', () => {
    it('should delete an existent product', async () => {
      const productDetailIdDTO = 'one-product'

      await productDetailsMongoClient.deleteById(productDetailIdDTO)

      const resultDTO = await productDetailsMongoClient.findById(productDetailIdDTO)

      expect(resultDTO).toBeUndefined()
    })

    it('should delete a missing product', async () => {
      const productDetailIdDTO = 'missing-product'

      const resultDTO = await productDetailsMongoClient.findById(productDetailIdDTO)

      expect(resultDTO).toBeUndefined()

      await productDetailsMongoClient.deleteById(productDetailIdDTO)
    })
  })

})
