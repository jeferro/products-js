import 'reflect-metadata'

import { ProductUpdatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO.mother.spec'
import { ProductCreatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO.mother.spec'
import { ProductDeletedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO.mother.spec'
import { KafkaConsumerTestBootstraper } from '../KafkaConsumerTestBootstraper'
import { ProductsKafkaConsumerSpec } from 'src/infrastructure-components/kafka/products/ProductsKafkaConsumerSpec'
import { ProductsKafkaConsumerMock } from './ProductsKafkaConsumerMock'
import { ProductActivationChangedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO.mother.spec'


describe(`${ProductsKafkaConsumerSpec.name} (e2e)`, () => {

  let testBootstraper = new KafkaConsumerTestBootstraper()

  let productsKafkaConsumerMock: ProductsKafkaConsumerMock

  beforeAll(async () => {
    productsKafkaConsumerMock = await testBootstraper.start(ProductsKafkaConsumerMock)
  })

  afterAll(async () => {
    await testBootstraper.stop()
  })

  describe('consume each', () => {
    it('should consume a product created event', async () => {
      const event = ProductCreatedKafkaDTOMother.one()

      await testBootstraper.sendEnvelope(
        ProductsKafkaConsumerMock.TOPIC,
        event,
        event.productId
      )

      const envelope = await productsKafkaConsumerMock.blockResult.waitForResult()

      expect(envelope.payload).toStrictEqual(event)
    })

    it('should consume a product updated event', async () => {
      const event = ProductUpdatedKafkaDTOMother.one()

      await testBootstraper.sendEnvelope(
        ProductsKafkaConsumerMock.TOPIC,
        event,
        event.productId
      )

      const envelope = await productsKafkaConsumerMock.blockResult.waitForResult()

      expect(envelope.payload).toEqual(event)
    })

    it('should consume a product activation changed', async () => {
      const event = ProductActivationChangedKafkaDTOMother.one()

      await testBootstraper.sendEnvelope(
        ProductsKafkaConsumerMock.TOPIC,
        event,
        event.productId
      )

      const envelope = await productsKafkaConsumerMock.blockResult.waitForResult()

      expect(envelope.payload).toEqual(event)
    })

    it('should consume a product deleted event', async () => {
      const event = ProductDeletedKafkaDTOMother.one()

      await testBootstraper.sendEnvelope(
        ProductsKafkaConsumerMock.TOPIC,
        event,
        event.productId
      )

      const envelope = await productsKafkaConsumerMock.blockResult.waitForResult()

      expect(envelope.payload).toEqual(event)
    })
  })

})
