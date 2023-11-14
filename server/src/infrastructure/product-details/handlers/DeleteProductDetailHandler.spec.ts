import 'reflect-metadata'

import { LoggerCreator, Logger, AuthMother } from 'jf-architecture'
import { Mock, mockInterface } from 'jf-mocks'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'
import { DeleteProductDetailHandler } from './DeleteProductDetailHandler'
import { ProductDetailInMemoryRepository } from '../adapters/in-memory/ProductDetailInMemoryRepository'
import { DeleteProductDetail } from './commands/DeleteProductDetail'
import { ProductDetailMohther } from '../projections/ProductDetail.mother.spec'
import { ProductDetailNotFoundException } from '../exceptions/ProductDetailNotFoundException'

describe(`${DeleteProductDetailHandler.name}`, () => {
  let logger: Mock<Logger>

  let loggerCreator: Mock<LoggerCreator>

  let productDetailsInMemoryRepository: ProductDetailInMemoryRepository

  let deleteProductDetailHandler: DeleteProductDetailHandler

  beforeAll(async () => {
    logger = mockInterface<Logger>()
    loggerCreator = mockInterface<LoggerCreator>()
    loggerCreator.ofObject.mockReturnValue(logger)

    productDetailsInMemoryRepository = new ProductDetailInMemoryRepository()

    deleteProductDetailHandler = new DeleteProductDetailHandler(
      loggerCreator,
      productDetailsInMemoryRepository,
    )
  })

  it("should delete produtc detail when it is exist", async () => {
    const expected = ProductDetailMohther.one()

    productDetailsInMemoryRepository.reset(expected)

    const auth = AuthMother.oneUserAuth()
    const productId = expected.id
    const command = new DeleteProductDetail(
      auth,
      productId
    )

    const result = await deleteProductDetailHandler.execute(command)

    expect(result).toStrictEqual(expected)

    const dbProduct = await productDetailsInMemoryRepository.findById(productId)

    expect(dbProduct).toBeUndefined()
  })

  it("should throw error when product detail isn't exist", async () => {
    productDetailsInMemoryRepository.reset()

    const auth = AuthMother.oneUserAuth()
    const productId = ProductIdMother.one()
    const command = new DeleteProductDetail(
      auth,
      productId
    )

    expect(deleteProductDetailHandler.execute(command))
      .rejects
      .toThrowError(ProductDetailNotFoundException)
  })
})

