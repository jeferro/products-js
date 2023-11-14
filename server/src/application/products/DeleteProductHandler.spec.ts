import 'reflect-metadata'

import { LoggerCreator, FakeTimeService, Logger, AuthMother, UserAuth } from 'jf-architecture'
import { ProductsInMemoryRepository } from 'src/infrastructure/products/adapters/in-memory/ProductsInMemoryRepository'
import { Mock, mockInterface } from 'jf-mocks'
import { DeleteProductHandler as DeleteProductHandler } from './DeleteProductHandler'
import { DeleteProduct } from './commands/DeleteProduct'
import { ProductMother } from 'src/domain/products/entities/Product.mother.spec'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'
import { ProductNotFoundException } from 'src/domain/products/exceptions/ProductNotFoundException'
import { ProductsInMemoryStream } from 'src/infrastructure/products/adapters/in-memory/ProductsInMemoryStream'
import { Product } from 'src/domain/products/entities/Product'
import { ProductDeleted } from 'src/domain/products/events/ProductDeleted'

describe(`${DeleteProductHandler.name}`, () => {
  let logger: Mock<Logger>

  let loggerCreator: Mock<LoggerCreator>

  let productsInMemoryRepository: ProductsInMemoryRepository

  let productsInMemoryStream: ProductsInMemoryStream

  let deleteProductHandler: DeleteProductHandler

  beforeAll(async () => {
    logger = mockInterface<Logger>()
    loggerCreator = mockInterface<LoggerCreator>()
    loggerCreator.ofObject.mockReturnValue(logger)

    productsInMemoryRepository = new ProductsInMemoryRepository()

    productsInMemoryStream = new ProductsInMemoryStream()

    deleteProductHandler = new DeleteProductHandler(
      loggerCreator,
      productsInMemoryRepository,
      productsInMemoryStream
    )
  })

  it('should delete a enabled product', async () => {
    const deletedProduct = ProductMother.oneEnabled()

    productsInMemoryStream.reset()
    productsInMemoryRepository.reset(deletedProduct)

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const command = new DeleteProduct(
      auth,
      deletedProduct.id)

    const product = await deleteProductHandler.execute(command)

    expect(product).toEqual(deletedProduct)

    await checkProductDoesNotExistInDb(
      productsInMemoryRepository,
      deletedProduct
    )

    const event = productsInMemoryStream.shift() as ProductDeleted

    checkProductDeleted(
      event,
      deletedProduct,
      auth,
      now
    )
  })

  it('should delete a disabled product', async () => {
    const deletedProduct = ProductMother.oneDisabled()

    productsInMemoryStream.reset()
    productsInMemoryRepository.reset(deletedProduct)

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const command = new DeleteProduct(
      auth,
      deletedProduct.id
    )

    const product = await deleteProductHandler.execute(command)

    expect(product).toEqual(deletedProduct)

    await checkProductDoesNotExistInDb(
      productsInMemoryRepository,
      deletedProduct
    )

    const event = productsInMemoryStream.shift() as ProductDeleted

    checkProductDeleted(
      event,
      deletedProduct,
      auth,
      now
    )
  })

  it('should throw exception when product does not exist', async () => {
    productsInMemoryStream.reset()
    productsInMemoryRepository.reset()

    const productId = ProductIdMother.one()
    const command = new DeleteProduct(
      AuthMother.oneUserAuth(),
      productId
    )

    await expect(deleteProductHandler.execute(command))
      .rejects
      .toThrowError(ProductNotFoundException)
  })
})


async function checkProductDoesNotExistInDb(
  productsInMemoryRepository: ProductsInMemoryRepository,
  deletedProduct: Product
) {
  const dbProduct = await productsInMemoryRepository.findById(deletedProduct.id)

  expect(dbProduct).toBeUndefined()
}

function checkProductDeleted(
  event: ProductDeleted | undefined,
  deletedProduct: Product,
  auth: UserAuth,
  now: Date
) {
  expect(event).not.toBeUndefined()
  expect(event?.ocurredOn).toEqual(now)
  expect(event?.ocurredBy).toStrictEqual(auth.username)
  expect(event?.productId).toStrictEqual(deletedProduct.id)
}
