import 'reflect-metadata'

import { LoggerCreator, Logger, AuthMother } from 'jf-architecture'
import { Mock, mockInterface } from 'jf-mocks'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'
import { ProductDetailInMemoryRepository } from '../adapters/in-memory/ProductDetailInMemoryRepository'
import { ProductDetailMohther } from '../projections/ProductDetail.mother.spec'
import { ProductDetailNotFoundException } from '../exceptions/ProductDetailNotFoundException'
import { GetProductDetailHandler } from './GetProductDetailHandler'
import { GetProductDetail } from './queries/GetProductDetail'

describe(`${GetProductDetailHandler.name}`, () => {
  let logger: Mock<Logger>

  let loggerCreator: Mock<LoggerCreator>

  let productDetailsInMemoryRepository: ProductDetailInMemoryRepository

  let getProductDetailHandler: GetProductDetailHandler

  beforeAll(async () => {
    logger = mockInterface<Logger>()
    loggerCreator = mockInterface<LoggerCreator>()
    loggerCreator.ofObject.mockReturnValue(logger)

    productDetailsInMemoryRepository = new ProductDetailInMemoryRepository()

    getProductDetailHandler = new GetProductDetailHandler(
      loggerCreator,
      productDetailsInMemoryRepository,
    )
  })

  it("should return produtc detail when it is exist", async () => {
    const expected = ProductDetailMohther.one()

    productDetailsInMemoryRepository.reset(expected)

    const auth = AuthMother.oneUserAuth()
    const productId = expected.id
    const query = new GetProductDetail(
      auth,
      productId
    )

    const result = await getProductDetailHandler.execute(query)

    expect(result).toStrictEqual(expected)

    const dbProduct = await productDetailsInMemoryRepository.findById(productId)

    expect(dbProduct).toStrictEqual(expected)
  })

  it("should throw error when product detail is disabled", async () => {
    const disabledProductDetail = ProductDetailMohther.oneDisabled()
    productDetailsInMemoryRepository.reset(disabledProductDetail)

    const auth = AuthMother.oneUserAuth()
    const productId = disabledProductDetail.id
    const query = new GetProductDetail(
      auth,
      productId
    )

    expect(getProductDetailHandler.execute(query))
      .rejects
      .toThrowError(ProductDetailNotFoundException)
  })

  it("should throw error when product detail isn't exist", async () => {
    productDetailsInMemoryRepository.reset()

    const auth = AuthMother.oneUserAuth()
    const productId = ProductIdMother.one()
    const query = new GetProductDetail(
      auth,
      productId
    )

    expect(getProductDetailHandler.execute(query))
      .rejects
      .toThrowError(ProductDetailNotFoundException)
  })
})

