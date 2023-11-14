import 'reflect-metadata'

import { LoggerCreator, Logger, AuthMother } from 'jf-architecture'
import { ProductsInMemoryRepository } from 'src/infrastructure/products/adapters/in-memory/ProductsInMemoryRepository'
import { Mock, mockInterface } from 'jf-mocks'
import { GetProductHandler } from './GetProductHandler'
import { GetProduct } from './queries/GetProduct'
import { ProductMother } from 'src/domain/products/entities/Product.mother.spec'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'
import { ProductNotFoundException } from 'src/domain/products/exceptions/ProductNotFoundException'

describe(`${GetProductHandler.name}`, () => {
  let logger: Mock<Logger>

  let loggerCreator: Mock<LoggerCreator>

  let productsInMemoryRepository: ProductsInMemoryRepository

  let getProductHandler: GetProductHandler

  beforeAll(async () => {
    logger = mockInterface<Logger>()
    loggerCreator = mockInterface<LoggerCreator>()
    loggerCreator.ofObject.mockReturnValue(logger)

    productsInMemoryRepository = new ProductsInMemoryRepository()

    getProductHandler = new GetProductHandler(loggerCreator, productsInMemoryRepository)
  })

  it('should get product', async () => {
    const expectedProduct = ProductMother.oneEnabled()
    
    productsInMemoryRepository.reset(expectedProduct)

    const command = new GetProduct(
      AuthMother.oneUserAuth(), 
      expectedProduct.id
    )

    const result = await getProductHandler.execute(command)

    expect(result).toStrictEqual(expectedProduct)
  })

  it('should throw exception when product does not exist', async () => {
    productsInMemoryRepository.reset()

    const productId = ProductIdMother.one()
    const command = new GetProduct(
      AuthMother.oneUserAuth(),
      productId
    )

    await expect(getProductHandler.execute(command))
      .rejects
      .toThrowError(ProductNotFoundException)
  })
})
