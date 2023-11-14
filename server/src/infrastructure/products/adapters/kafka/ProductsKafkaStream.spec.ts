import { mockClass } from 'jf-mocks'
import { ProductsKafkaStream } from './ProductsKafkaStream'
import { ProductsKafkaProducer } from 'src/infrastructure-components/kafka/products/ProductsKafkaProducer'
import { ProductsConfiguration } from '../../ProductsConfiguration'
import { ProductCreatedKafkaMapper } from './mappers/ProductCreatedKafkaMapper'
import { ProductUpdatedKafkaMapper } from './mappers/ProductUpdatedKafkaMapper'
import { ProductDeletedKafkaMapper } from './mappers/ProductDeletedKafkaMapper'
import { ProductCreatedMother } from 'src/domain/products/events/ProductCreated.mother.spec'
import { ProductCreated } from 'src/domain/products/events/ProductCreated'
import { ProductUpdatedMother } from 'src/domain/products/events/ProductUpdated.mother.spec'
import { ProductUpdated } from 'src/domain/products/events/ProductUpdated'
import { ProductDeleted } from 'src/domain/products/events/ProductDeleted'
import { ProductDeletedMother } from 'src/domain/products/events/ProductDeleted.mother.spec'
import { ProductActivationChangedKafkaMapper } from './mappers/ProductActivationChangedKafkaMapper'
import { ProductActivationChangedMother } from 'src/domain/products/events/ProductActivationChanged.mother.spec'
import { ProductActivationChanged } from 'src/domain/products/events/ProductActivationChanged'


describe(`${ProductsKafkaStream.name}`, () => {
  const productCreatedKafkaMapper = new ProductCreatedKafkaMapper()

  const productUpdatedKafkaMapper = new ProductUpdatedKafkaMapper()

  const productEnabledKafkaMapper = new ProductActivationChangedKafkaMapper()

  const productDeletedKafkaMapper = new ProductDeletedKafkaMapper()

  const productsConfig = new ProductsConfiguration(
    true, 
    'products-topic',
    'products-group'
  )

  const productsKafkaProducer = mockClass(ProductsKafkaProducer)

  const productsKafkaStream = new ProductsKafkaStream(
    productsConfig,
    productsKafkaProducer
  )

  it('should send product created', async () => {
    productsKafkaProducer.publish.mockReset()
    productsKafkaProducer.publish.mockResolvedValue()

    const event = ProductCreatedMother.one()

    await productsKafkaStream.publishEach(event)

    checkProductCreatedParams(
      productsKafkaProducer.publish.mock.calls[0],
      event
    )
  })

  it('should send product updated', async () => {
    productsKafkaProducer.publish.mockReset()
    productsKafkaProducer.publish.mockResolvedValue()

    const event = ProductUpdatedMother.one()

    await productsKafkaStream.publishEach(event)

    checkProductUpdatedParams(
      productsKafkaProducer.publish.mock.calls[0],
      event
    )
  })

  it('should send product activation changed', async () => {
    productsKafkaProducer.publish.mockReset()
    productsKafkaProducer.publish.mockResolvedValue()

    const event = ProductActivationChangedMother.one()

    await productsKafkaStream.publishEach(event)

    checkProductActivationChangedParams(
      productsKafkaProducer.publish.mock.calls[0],
      event
    )
  })

  it('should send product deleted', async () => {
    productsKafkaProducer.publish.mockReset()
    productsKafkaProducer.publish.mockResolvedValue()

    const event = ProductDeletedMother.one()

    await productsKafkaStream.publishEach(event)

    checkProductDeletedParams(
      productsKafkaProducer.publish.mock.calls[0],
      event
    )
  })

  function checkProductCreatedParams(
    params: any[],
    event: ProductCreated
  ) {
    const eventDTO = productCreatedKafkaMapper.toDTO(event)

    expect(params[0]).toEqual(productsConfig.topic)
    expect(params[1]).toEqual(eventDTO)
  }

  function checkProductUpdatedParams(
    params: any[],
    event: ProductUpdated
  ) {
    const eventDTO = productUpdatedKafkaMapper.toDTO(event)

    expect(params[0]).toEqual(productsConfig.topic)
    expect(params[1]).toEqual(eventDTO)
  }

  function checkProductActivationChangedParams(
    params: any[],
    event: ProductActivationChanged
  ) {
    const eventDTO = productEnabledKafkaMapper.toDTO(event)

    expect(params[0]).toEqual(productsConfig.topic)
    expect(params[1]).toEqual(eventDTO)
  }

  function checkProductDeletedParams(
    params: any[],
    event: ProductDeleted
  ) {
    const eventDTO = productDeletedKafkaMapper.toDTO(event)

    expect(params[0]).toEqual(productsConfig.topic)
    expect(params[1]).toEqual(eventDTO)
  }

})
