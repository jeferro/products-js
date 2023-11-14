
import { MongoRepositoryTestBootstraper } from '../MongoRepositoryTestBootstraper'
import { ProductsMongoClient } from 'src/infrastructure-components/mongo/products/ProductsMongoClient'
import { ProductMongoDTOMother } from 'src/infrastructure-components/mongo/products/dtos/products/ProductMongoDTO.mother.spec'


describe(`${ProductsMongoClient.name} (e2e)`, () => {
  let testBootstraper = new MongoRepositoryTestBootstraper()

  let productsMongoClient: ProductsMongoClient

  beforeAll(async () => {
    productsMongoClient = await testBootstraper.start(
      ProductsMongoClient,
      `${__dirname}/initdb/test-products.js`
    )
  })

  afterAll(async () => {
    await testBootstraper.stop()
  })

  describe('Find by id', () => {
    it('should return undefined when product does not exist', async () => {
      const productIdDTO = 'wrong-id'

      const productDTO = await productsMongoClient.findById(productIdDTO)

      expect(productDTO).toBeUndefined()
    })

    it('should return an product when product exists', async () => {
      const productIdDTO = 'one-product'

      const productDTO = await productsMongoClient.findById(productIdDTO)

      expect(productDTO).not.toBeUndefined()
      expect(productDTO?._id).toEqual(productIdDTO)
    })
  })

  describe('Find all', () => {
    it('should return all products', async () => {
      const productDTOS = await productsMongoClient.findAll()

      expect(productDTOS).toHaveLength(3)
    })
  })

  describe('Save', () => {
    it('should save the product', async () => {
      const expectedDTO = ProductMongoDTOMother.oneEnabled()

      await productsMongoClient.save(expectedDTO)

      const resultDTO = await productsMongoClient.findById(expectedDTO._id)

      expect(resultDTO).toStrictEqual(expectedDTO)
    })
  })

  describe('Delete', () => {
    it('should delete an existent product', async () => {
      const productIdDTO = 'one-product'

      await productsMongoClient.deleteById(productIdDTO)

      const resultDTO = await productsMongoClient.findById(productIdDTO)

      expect(resultDTO).toBeUndefined()
    })

    it('should delete a missing product', async () => {
      const productIdDTO = 'missing-product'

      const resultDTO = await productsMongoClient.findById(productIdDTO)

      expect(resultDTO).toBeUndefined()

      await productsMongoClient.deleteById(productIdDTO)
    })
  })

})
