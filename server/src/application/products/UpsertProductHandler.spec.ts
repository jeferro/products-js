import 'reflect-metadata'

import { LoggerCreator, FakeTimeService, Logger, AuthMother, Metadata, UserAuth } from 'jf-architecture'
import { ProductsInMemoryRepository } from 'src/infrastructure/products/adapters/in-memory/ProductsInMemoryRepository'
import { Mock, mockInterface } from 'jf-mocks'
import { UpsertProductHandler } from './UpsertProductHandler'
import { UpsertProduct } from './commands/UpsertProduct'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'
import { ProductMother } from 'src/domain/products/entities/Product.mother.spec'
import { ProductsInMemoryStream } from 'src/infrastructure/products/adapters/in-memory/ProductsInMemoryStream'
import { Product } from 'src/domain/products/entities/Product'
import { ProductCreated } from 'src/domain/products/events/ProductCreated'
import { ProductUpdated } from 'src/domain/products/events/ProductUpdated'

describe(`${UpsertProductHandler.name}`, () => {
  let logger: Mock<Logger>

  let loggerCreator: Mock<LoggerCreator>

  let productsInMemoryRepository: ProductsInMemoryRepository

  let productsInMemoryStream: ProductsInMemoryStream

  let upsertProductsHandler: UpsertProductHandler

  beforeAll(async () => {
    logger = mockInterface<Logger>()
    loggerCreator = mockInterface<LoggerCreator>()
    loggerCreator.ofObject.mockReturnValue(logger)

    productsInMemoryRepository = new ProductsInMemoryRepository()

    productsInMemoryStream = new ProductsInMemoryStream()

    upsertProductsHandler = new UpsertProductHandler(
      loggerCreator,
      productsInMemoryRepository,
      productsInMemoryStream,
    )
  })

  it("should create produtc when it isn't exist", async () => {
    productsInMemoryRepository.reset()

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const productId = ProductIdMother.one()
    const title = 'title of new product'
    const description = 'description of new product'
    const command = new UpsertProduct(
      auth,
      productId,
      title,
      description)

    const result = await upsertProductsHandler.execute(command)

    const metadata = new Metadata(
      auth.username,
      now,
      auth.username,
      now
    )
    const expected = new Product(
      productId,
      title,
      description,
      true,
      metadata
    )

    expected.domainEvents.record(
      ProductCreated.of(expected)
    )

    expect(result).toStrictEqual(expected)

    const dbProduct = await productsInMemoryRepository.findById(productId)

    expect(dbProduct).toStrictEqual(result)

    const event = productsInMemoryStream.shift() as ProductCreated

    checkProductCreated(
      event,
      expected,
      auth,
      now
    )
  })

  it('should update product when it is exist', async () => {
    const initialProduct = ProductMother.oneEnabled()
    productsInMemoryRepository.reset(initialProduct)

    productsInMemoryStream.reset()

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const title = 'updated title'
    const description = 'updated description'
    const command = new UpsertProduct(
      auth,
      initialProduct.id,
      title, description
    )

    const result = await upsertProductsHandler.execute(command)

    checkProductWasUpdated(
      result,
      auth,
      title,
      description,
      now)

    const dbProduct = await productsInMemoryRepository.findById(initialProduct.id)

    checkProductWasUpdated(
      dbProduct,
      auth,
      title,
      description,
      now
    )

    const event = productsInMemoryStream.shift() as ProductUpdated

    checkProductUpdated(
      event,
      initialProduct,
      auth,
      now
    )
  })
})


function checkProductWasUpdated(
  result: Product | undefined,
  auth: UserAuth,
  title: string,
  description: string,
  now: Date
) {
  expect(result).not.toBeUndefined()
  expect(result?.title).toEqual(title)
  expect(result?.description).toEqual(description)
  expect(result?.updatedBy).toEqual(auth.username)
  expect(result?.updatedAt).toEqual(now)
}

function checkProductCreated(
  event: ProductCreated | undefined,
  deletedProduct: Product,
  auth: UserAuth,
  now: Date
) {
  expect(event).not.toBeUndefined()
  expect(event).toBeInstanceOf(ProductCreated)
  expect(event?.ocurredOn).toEqual(now)
  expect(event?.ocurredBy).toStrictEqual(auth.username)
  expect(event?.productId).toStrictEqual(deletedProduct.id)
}

function checkProductUpdated(
  event: ProductUpdated | undefined,
  deletedProduct: Product,
  auth: UserAuth,
  now: Date
) {
  expect(event).not.toBeUndefined()
  expect(event).toBeInstanceOf(ProductUpdated)
  expect(event?.ocurredOn).toEqual(now)
  expect(event?.ocurredBy).toStrictEqual(auth.username)
  expect(event?.productId).toStrictEqual(deletedProduct.id)
}
