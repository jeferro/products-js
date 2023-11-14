import 'reflect-metadata'

import { ListProductsHandler } from './ListProductsHandler'
import { LoggerCreator, Logger, AuthMother } from 'jf-architecture'
import { ProductsInMemoryRepository } from 'src/infrastructure/products/adapters/in-memory/ProductsInMemoryRepository'
import { ListProducts } from './queries/ListProducts'
import { Mock, mockInterface } from 'jf-mocks'
import { ProductMother } from 'src/domain/products/entities/Product.mother.spec'
import { Products } from 'src/domain/products/entities/Products'

describe(`${ListProductsHandler.name}`, () => {
  let logger: Mock<Logger>

  let loggerCreator: Mock<LoggerCreator>

  let productsInMemoryRepository: ProductsInMemoryRepository

  let listProductsHandler: ListProductsHandler

  beforeAll(async () => {
    logger = mockInterface<Logger>()
    loggerCreator = mockInterface<LoggerCreator>()
    loggerCreator.ofObject.mockReturnValue(logger)

    productsInMemoryRepository = new ProductsInMemoryRepository()

    listProductsHandler = new ListProductsHandler(
      loggerCreator,
      productsInMemoryRepository,
    )
  })

  it('should list products', async () => {
    const oneProduct = ProductMother.oneEnabled()
    const twoProduct = ProductMother.twoDisabled()

    productsInMemoryRepository.reset(oneProduct, twoProduct)

    const command = new ListProducts(
      AuthMother.oneUserAuth()
    )

    const result = await listProductsHandler.execute(command)

    const expected = Products.of(oneProduct, twoProduct)

    expect(result).toEqual(expected)
  })
})
