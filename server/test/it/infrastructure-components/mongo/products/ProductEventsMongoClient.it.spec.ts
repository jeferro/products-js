
import { MongoRepositoryTestBootstraper } from '../MongoRepositoryTestBootstraper'
import { ProductEventsMongoClient } from 'src/infrastructure-components/mongo/products/ProductEventsMongoClient'
import { ProductCreatedMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductCreatedMongoDTO'
import { ProductUpdatedMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductUpdatedMongoDTO'
import { ProductCreatedMongoDTOMother } from 'src/infrastructure-components/mongo/products/dtos/events/ProductCreatedMongoDTO.mother.spec'
import { ProductDeletedMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductDeletedMongoDTO'
import { ProductUpdatedMongoDTOMother } from 'src/infrastructure-components/mongo/products/dtos/events/ProductUpdatedMongoDTO.mother.spec'
import { ProductDeletedMongoDTOMother } from 'src/infrastructure-components/mongo/products/dtos/events/ProductDeletedMongoDTO.mother.spec'
import { ProductActivationChangedMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductActivationChangedMongoDTO'
import { ProductActivationChangedMongoDTOMother } from 'src/infrastructure-components/mongo/products/dtos/events/ProductActivationChangedMongoDTO.mother.spec'


describe(`${ProductEventsMongoClient.name} (e2e)`, () => {
  let testBootstraper = new MongoRepositoryTestBootstraper()

  let productEventsMongoClient: ProductEventsMongoClient

  beforeAll(async () => {
    productEventsMongoClient = await testBootstraper.start(
      ProductEventsMongoClient,
      `${__dirname}/initdb/test-product-events.js`
    )
  })

  afterAll(async () => {
    await testBootstraper.stop()
  })

  describe('Find by id', () => {
    it('should return undefined when event does not exist', async () => {
      const resultDTO = await productEventsMongoClient.findById('wrong-id')

      expect(resultDTO).toBeUndefined()
    })

    it('should return an product created event when event exists', async () => {
      const eventIdDTO = 'one-product::2023-10-29T09:00:00.028+0000'

      const resultDTO = await productEventsMongoClient.findById(eventIdDTO)

      expect(resultDTO).not.toBeUndefined()
      expect(resultDTO).toBeInstanceOf(ProductCreatedMongoDTO)
      expect(resultDTO?._id).toEqual(eventIdDTO)
    })

    it('should return an product updated event when event exists', async () => {
      const eventIdDTO = 'one-product::2023-10-29T09:11:00.028+0000'

      const resultDTO = await productEventsMongoClient.findById(eventIdDTO)

      expect(resultDTO).not.toBeUndefined()
      expect(resultDTO).toBeInstanceOf(ProductUpdatedMongoDTO)
      expect(resultDTO?._id).toEqual(eventIdDTO)
    })

    it('should return an product actication changed event when event exists', async () => {
      const eventIdDTO = 'one-product::2023-10-29T09:22:00.028+0000'

      const resultDTO = await productEventsMongoClient.findById(eventIdDTO)

      expect(resultDTO).not.toBeUndefined()
      expect(resultDTO).toBeInstanceOf(ProductActivationChangedMongoDTO)
      expect(resultDTO?._id).toEqual(eventIdDTO)
    })

    it('should return an product deleted event when event exists', async () => {
      const eventIdDTO = 'one-product::2023-10-29T09:44:00.028+0000'

      const resultDTO = await productEventsMongoClient.findById(eventIdDTO)

      expect(resultDTO).not.toBeUndefined()
      expect(resultDTO).toBeInstanceOf(ProductDeletedMongoDTO)
      expect(resultDTO?._id).toEqual(eventIdDTO)
    })
  })

  describe('Save', () => {
    it('should save a product created', async () => {
      const expectedDTO = ProductCreatedMongoDTOMother.one()

      await productEventsMongoClient.save(expectedDTO)

      const dbEventDTO = await productEventsMongoClient.findById(expectedDTO._id)

      expect(dbEventDTO).toStrictEqual(expectedDTO)
    })

    it('should save a product updated', async () => {
      const expectedDTO = ProductUpdatedMongoDTOMother.one()

      await productEventsMongoClient.save(expectedDTO)

      const dbEventDTO = await productEventsMongoClient.findById(expectedDTO._id)

      expect(dbEventDTO).toStrictEqual(expectedDTO)
    })

    it('should save a product activation changed', async () => {
      const expectedDTO = ProductActivationChangedMongoDTOMother.one()

      await productEventsMongoClient.save(expectedDTO)

      const dbEventDTO = await productEventsMongoClient.findById(expectedDTO._id)

      expect(dbEventDTO).toStrictEqual(expectedDTO)
    })

    it('should save a product deleted', async () => {
      const expectedDTO = ProductDeletedMongoDTOMother.one()

      await productEventsMongoClient.save(expectedDTO)

      const dbEventDTO = await productEventsMongoClient.findById(expectedDTO._id)

      expect(dbEventDTO).toStrictEqual(expectedDTO)
    })
  })

})
