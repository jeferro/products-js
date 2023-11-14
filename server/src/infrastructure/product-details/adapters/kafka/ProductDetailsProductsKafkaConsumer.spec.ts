import { mockInterface } from 'jf-mocks'
import { ProductDetailsProductsKafkaConsumer } from './ProductDetailProductsKafkaConsumer'
import { ProductCreatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO.mother.spec'
import { EnvelopKafkaDTOMother } from 'jf-nestjs-kafka'
import { ProductEventKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductEventKafkaDTO'
import { SystemAuth, CommandBus } from 'jf-architecture'
import { ProductUpdatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO.mother.spec'
import { ProductDeletedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO.mother.spec'
import { ProductDetailsConfiguration } from '../../ProductDetailsConfiguration'
import { UpsertProductDetail } from '../../handlers/commands/UpsertProductDetail'
import { DeleteProductDetail } from '../../handlers/commands/DeleteProductDetail'
import { ProductIdKafkaMapper } from 'src/infrastructure/products/adapters/kafka/mappers/ProductIdKafkaMapper'
import { ProductActivationChangedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO.mother.spec'
import { ChangeProductDetailActivation } from '../../handlers/commands/ChangeActivationProductDetail'
import { ProductActivationChangedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO'
import { ProductCreatedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO'
import { ProductUpdatedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO'


describe(`${ProductDetailsProductsKafkaConsumer.name}`, () => {

  const productIdKakfaMapper = new ProductIdKafkaMapper()

  const productDetailsConfig = new ProductDetailsConfiguration(
    true, 
    'products-topic',
    'products-group'
  )

  const commandBus = mockInterface<CommandBus>()

  const productDetailsProductsKafkaConsumer = new ProductDetailsProductsKafkaConsumer(
    productDetailsConfig,
    commandBus
  )

  beforeEach(() => {
    commandBus.execute.mockReset()
  })

  it('should upsert product detail on product created', async () => {
    const event = ProductCreatedKafkaDTOMother.one()
    const envelope = EnvelopKafkaDTOMother.ofEvent(event)

    await productDetailsProductsKafkaConsumer.onProductCreated(envelope)

    checkUpsertProductDetailCommandOfCreation(
      commandBus.execute.mock.calls[0][0] as UpsertProductDetail,
      event
    )
  })

  it('should upsert product detail on product updated', async () => {
    const event = ProductUpdatedKafkaDTOMother.one()
    const envelope = EnvelopKafkaDTOMother.ofEvent(event)

    await productDetailsProductsKafkaConsumer.onProductUpdated(envelope)

    checkUpsertProductDetailCommandOfUpdation(
      commandBus.execute.mock.calls[0][0] as UpsertProductDetail,
      event
    )
  })

  it('should upsert product detail on product activation changed', async () => {
    const event = ProductActivationChangedKafkaDTOMother.one()
    const envelope = EnvelopKafkaDTOMother.ofEvent(event)

    await productDetailsProductsKafkaConsumer.onProductActivationChanged(envelope)

    checkChangeProductDetailActivationCommand(
      commandBus.execute.mock.calls[0][0] as ChangeProductDetailActivation,
      event
    )
  })

  it('should delete product detail on product deleted', async () => {
    const event = ProductDeletedKafkaDTOMother.one()
    const envelope = EnvelopKafkaDTOMother.ofEvent(event)

    await productDetailsProductsKafkaConsumer.onProductDeleted(envelope)

    checkDeleteProductDetailCommand(
      commandBus.execute.mock.calls[0][0] as DeleteProductDetail,
      event
    )
  })

  function checkUpsertProductDetailCommandOfCreation(
    command: UpsertProductDetail,
    event: ProductCreatedKafkaDTO
  ) {
    const productId = productIdKakfaMapper.toEntity(event.productId)

    expect(command.auth).toBeInstanceOf(SystemAuth)
    expect(command.productId).toEqual(productId)
    expect(command.title).toEqual(event.title)
    expect(command.description).toEqual(event.description)
    expect(command.enabled).toEqual(event.enabled)
    expect(command.ocurredOn).toEqual(event.ocurredOn)
  }

  function checkUpsertProductDetailCommandOfUpdation(
    command: UpsertProductDetail,
    event: ProductUpdatedKafkaDTO
  ) {
    const productId = productIdKakfaMapper.toEntity(event.productId)

    expect(command.auth).toBeInstanceOf(SystemAuth)
    expect(command.productId).toEqual(productId)
    expect(command.title).toEqual(event.title)
    expect(command.description).toEqual(event.description)
    expect(command.enabled).toEqual(undefined)
    expect(command.ocurredOn).toEqual(event.ocurredOn)
  }

  function checkChangeProductDetailActivationCommand(
    command: ChangeProductDetailActivation,
    event: ProductActivationChangedKafkaDTO
  ) {
    const productId = productIdKakfaMapper.toEntity(event.productId)

    expect(command.auth).toBeInstanceOf(SystemAuth)
    expect(command.productId).toEqual(productId)
    expect(command.enabled).toEqual(event.enabled)
    expect(command.ocurredOn).toEqual(event.ocurredOn)
  }

  function checkDeleteProductDetailCommand(
    command: DeleteProductDetail,
    event: ProductEventKafkaDTO
  ) {
    const productId = productIdKakfaMapper.toEntity(event.productId)

    expect(command.auth).toBeInstanceOf(SystemAuth)
    expect(command.productId).toEqual(productId)
  }

})
