import 'reflect-metadata'

import { LoggerCreator, FakeTimeService, Logger, AuthMother, UserAuth } from 'jf-architecture'
import { ProductsInMemoryRepository } from 'src/infrastructure/products/adapters/in-memory/ProductsInMemoryRepository'
import { Mock, mockInterface } from 'jf-mocks'
import { ChangeProductActivationHandler } from './ChangeProductActivationHandler'
import { ChangeProductActivation } from './commands/ChangeProductActivation'
import { ProductMother } from 'src/domain/products/entities/Product.mother.spec'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'
import { ProductNotFoundException } from 'src/domain/products/exceptions/ProductNotFoundException'
import { ProductsInMemoryStream } from 'src/infrastructure/products/adapters/in-memory/ProductsInMemoryStream'
import { Product } from 'src/domain/products/entities/Product'
import { ProductActivationChanged } from 'src/domain/products/events/ProductActivationChanged'

describe(`${ChangeProductActivationHandler.name}`, () => {
  let logger: Mock<Logger>

  let loggerCreator: Mock<LoggerCreator>

  let productsInMemoryRepository: ProductsInMemoryRepository

  let productsInMemoryStream: ProductsInMemoryStream

  let changeProductActivationHandler: ChangeProductActivationHandler

  beforeAll(async () => {
    logger = mockInterface<Logger>()
    loggerCreator = mockInterface<LoggerCreator>()
    loggerCreator.ofObject.mockReturnValue(logger)

    productsInMemoryRepository = new ProductsInMemoryRepository()

    productsInMemoryStream = new ProductsInMemoryStream()

    changeProductActivationHandler = new ChangeProductActivationHandler(
      loggerCreator,
      productsInMemoryRepository,
      productsInMemoryStream,
    )
  })

  it('should enable a disabled product', async () => {
    const initialProduct = ProductMother.oneDisabled()

    productsInMemoryStream.reset()
    productsInMemoryRepository.reset(initialProduct)

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const command = new ChangeProductActivation(
      auth,
      initialProduct.id,
      true
    )

    const result = await changeProductActivationHandler.execute(command)

    checkProduct(
      result,
      initialProduct,
      auth,
      now,
      true
    )

    const dbProduct = await productsInMemoryRepository.findById(initialProduct.id)

    checkProduct(
      dbProduct,
      initialProduct,
      auth,
      now,
      true
    )

    const event = productsInMemoryStream.shift() as ProductActivationChanged

    checkProductActivationChanges(
      event,
      initialProduct,
      auth,
      now
    )
  })

  it('should do nothing when user want enable an enabled product', async () => {
    const initialProduct = ProductMother.oneEnabled()

    productsInMemoryStream.reset()
    productsInMemoryRepository.reset(initialProduct)

    FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const command = new ChangeProductActivation(
      auth,
      initialProduct.id,
      true
    )

    const result = await changeProductActivationHandler.execute(command)

    expect(result).toStrictEqual(initialProduct)

    const dbProduct = await productsInMemoryRepository.findById(initialProduct.id)

    expect(dbProduct).toStrictEqual(initialProduct)

    expect(productsInMemoryStream.events).toHaveLength(0)
  })

  it('should disable a enabled product', async () => {
    const initialProduct = ProductMother.oneEnabled()

    productsInMemoryStream.reset()
    productsInMemoryRepository.reset(initialProduct)

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()

    const command = new ChangeProductActivation(
      auth,
      initialProduct.id,
      false
    )

    const result = await changeProductActivationHandler.execute(command)

    checkProduct(
      result,
      initialProduct,
      auth,
      now,
      false
    )

    const dbProduct = await productsInMemoryRepository.findById(initialProduct.id)

    checkProduct(
      dbProduct,
      initialProduct,
      auth,
      now,
      false
    )

    const event = productsInMemoryStream.shift() as ProductActivationChanged

    checkProductActivationChanges(
      event,
      initialProduct,
      auth,
      now
    )
  })

  it('should do nothing when user want disabled a disabled product', async () => {
    const initialProduct = ProductMother.oneDisabled()

    productsInMemoryStream.reset()
    productsInMemoryRepository.reset(initialProduct)

    FakeTimeService.configureOneMinuteLater()

    const command = new ChangeProductActivation(
      AuthMother.oneUserAuth(),
      initialProduct.id,
      false
    )

    const result = await changeProductActivationHandler.execute(command)

    expect(result).toStrictEqual(initialProduct)

    const dbProduct = await productsInMemoryRepository.findById(initialProduct.id)

    expect(dbProduct).toStrictEqual(initialProduct)

    expect(productsInMemoryStream.events).toHaveLength(0)
  })

  it('should throw exception when product does not exist', async () => {
    productsInMemoryStream.reset()
    productsInMemoryRepository.reset()

    const productId = ProductIdMother.one()
    const command = new ChangeProductActivation(
      AuthMother.oneUserAuth(),
      productId,
      true
    )

    await expect(changeProductActivationHandler.execute(command))
      .rejects
      .toThrowError(ProductNotFoundException)
  })
})


function checkProduct(
  product: Product | undefined,
  initialProduct: Product,
  auth: UserAuth,
  now: Date,
  enable: boolean
) {
  expect(product).not.toBeUndefined()
  expect(product?.id).toEqual(initialProduct.id)
  expect(product?.isEnabled).toEqual(enable)
  expect(product?.updatedBy).toEqual(auth.username)
  expect(product?.updatedAt).toEqual(now)
}

function checkProductActivationChanges(
  event: ProductActivationChanged | undefined,
  deletedProduct: Product,
  auth: UserAuth,
  now: Date
) {
  expect(event).not.toBeUndefined()
  expect(event?.ocurredOn).toEqual(now)
  expect(event?.ocurredBy).toStrictEqual(auth.username)
  expect(event?.productId).toStrictEqual(deletedProduct.id)
}
