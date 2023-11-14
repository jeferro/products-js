import { ProductsKafkaProducer } from 'src/infrastructure-components/kafka/products/ProductsKafkaProducer'
import { KafkaProducerTestBootstraper } from '../KafkaProducerTestBootstraper'
import { ProductCreatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO.mother.spec'
import { ProductUpdatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO.mother.spec'
import { ProductDeletedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO.mother.spec'
import { plainToInstance } from 'class-transformer'
import { ProductCreatedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO'
import { ProductUpdatedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO'
import { ProductDeletedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO '
import { Class } from 'jf-architecture'
import { KafkaDTO } from 'jf-nestjs-kafka'
import { ProductEventKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductEventKafkaDTO'
import { ProductActivationChangedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO.mother.spec'
import { ProductActivationChangedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO'

describe(`${ProductsKafkaProducer.name} (e2e)`, () => {
  const TOPIC = 'products-topic'

  let testBootstraper = new KafkaProducerTestBootstraper()

  let productsKafkaProducer: ProductsKafkaProducer

  beforeAll(async () => {
    productsKafkaProducer = await testBootstraper.start(
      ProductsKafkaProducer,
      TOPIC,
    )
  })

  afterAll(async () => {
    await testBootstraper.stop()
  })

  describe('publish each', () => {
    it('should publish a product created event', async () => {
      const event = ProductCreatedKafkaDTOMother.one()

      await productsKafkaProducer.publish(
        TOPIC,
        event
      )

      const envelopeRaw = await testBootstraper.waitForEnvelope()

      checkProductEventResult(
        envelopeRaw, 
        ProductCreatedKafkaDTO,
        event
      )
    })

    it('should publish a product updated event', async () => {
      const event = ProductUpdatedKafkaDTOMother.one()

      await productsKafkaProducer.publish(
        TOPIC,
        event
      )

      const envelopeRaw = await testBootstraper.waitForEnvelope()

      checkProductEventResult(
        envelopeRaw, 
        ProductUpdatedKafkaDTO,
        event
      )
    })

    it('should publish a product acttivation changed', async () => {
      const event = ProductActivationChangedKafkaDTOMother.one()

      await productsKafkaProducer.publish(
        TOPIC,
        event
      )

      const envelopeRaw = await testBootstraper.waitForEnvelope()

      checkProductEventResult(
        envelopeRaw, 
        ProductActivationChangedKafkaDTO,
        event
      )
    })

    it('should publish a product deleted event', async () => {
      const event = ProductDeletedKafkaDTOMother.one()

      await productsKafkaProducer.publish(
        TOPIC,
        event
      )

      const envelopeRaw = await testBootstraper.waitForEnvelope()

      checkProductEventResult(
        envelopeRaw, 
        ProductDeletedKafkaDTO,
        event
      )
    })
  })

  function checkProductEventResult(
    envelopeRaw: Record<string, any>, 
    eventClass: Class<KafkaDTO>,
    event: ProductEventKafkaDTO,
  ) {
    const result = plainToInstance(
      eventClass, 
      envelopeRaw.payload
    )
  
    expect(result).toEqual(event)
  }
})


