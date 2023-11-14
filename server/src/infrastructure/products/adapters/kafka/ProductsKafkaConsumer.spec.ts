import { mockInterface } from 'jf-mocks'
import { ProductsKafkaConsumer } from './ProductsKafkaConsumer'
import { ProductsConfiguration } from '../../ProductsConfiguration'
import { ProductCreatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO.mother.spec'
import { EnvelopKafkaDTOMother } from 'jf-nestjs-kafka'
import { SaveProductEvent } from '../../handlers/command/SaveProductEvent'
import { ProductEventKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductEventKafkaDTO'
import { SystemAuth, CommandBus } from 'jf-architecture'
import { ProductUpdatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO.mother.spec'
import { ProductDeletedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO.mother.spec'
import { ProductActivationChangedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO.mother.spec'


describe(`${ProductsKafkaConsumer.name}`, () => {

  const productsConfig = new ProductsConfiguration(
    true, 
    'products-topic',
    'products-group'
  )

  const commandBus = mockInterface<CommandBus>()

  const productsKafkaConsumer = new ProductsKafkaConsumer(
    productsConfig,
    commandBus
  )

  beforeEach(() => {
    commandBus.execute.mockReset()
  })

  it('should save product created event', async () => {
    const event = ProductCreatedKafkaDTOMother.one()
    const envelope = EnvelopKafkaDTOMother.ofEvent(event)

    await productsKafkaConsumer.onProductCreated(envelope)

    checkSaveProductEventCommand(
      commandBus.execute.mock.calls[0][0] as SaveProductEvent,
      event
    )
  })

  it('should save product updated event', async () => {
    const event = ProductUpdatedKafkaDTOMother.one()
    const envelope = EnvelopKafkaDTOMother.ofEvent(event)

    await productsKafkaConsumer.onProductUpdated(envelope)

    checkSaveProductEventCommand(
      commandBus.execute.mock.calls[0][0] as SaveProductEvent,
      event
    )
  })

  it('should save product activation changed', async () => {
    const event = ProductActivationChangedKafkaDTOMother.one()
    const envelope = EnvelopKafkaDTOMother.ofEvent(event)

    await productsKafkaConsumer.onProductActivationChanged(envelope)

    checkSaveProductEventCommand(
      commandBus.execute.mock.calls[0][0] as SaveProductEvent,
      event
    )
  })

  it('should save product deleted event', async () => {
    const event = ProductDeletedKafkaDTOMother.one()
    const envelope = EnvelopKafkaDTOMother.ofEvent(event)

    await productsKafkaConsumer.onProductDeleted(envelope)

    checkSaveProductEventCommand(
      commandBus.execute.mock.calls[0][0] as SaveProductEvent,
      event
    )
  })

  function checkSaveProductEventCommand(
    command: SaveProductEvent,
    event: ProductEventKafkaDTO
  ) {
    expect(command.auth).toBeInstanceOf(SystemAuth)
    expect(command.event).toEqual(event)
  }

})
