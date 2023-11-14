import 'reflect-metadata'

import { LoggerCreator, Logger, AuthMother, FakeTimeService, DateUtil } from 'jf-architecture'
import { Mock, mockInterface } from 'jf-mocks'
import { ProductDetailInMemoryRepository } from '../adapters/in-memory/ProductDetailInMemoryRepository'
import { ProductDetailMohther } from '../projections/ProductDetail.mother.spec'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'
import { ChangeProductDetailActivation } from './commands/ChangeActivationProductDetail'
import { ChangeProductDetailActivationHandler } from './ChangeProductDetailActivationHandler'
import { ProductDetailNotFoundException } from '../exceptions/ProductDetailNotFoundException'


describe(`${ChangeProductDetailActivation.name}`, () => {
  let logger: Mock<Logger>

  let loggerCreator: Mock<LoggerCreator>

  let productDetailsInMemoryRepository: ProductDetailInMemoryRepository

  let changeProductDetailActivationHandler: ChangeProductDetailActivationHandler

  beforeAll(async () => {
    logger = mockInterface<Logger>()
    loggerCreator = mockInterface<LoggerCreator>()
    loggerCreator.ofObject.mockReturnValue(logger)

    productDetailsInMemoryRepository = new ProductDetailInMemoryRepository()

    changeProductDetailActivationHandler = new ChangeProductDetailActivationHandler(
      loggerCreator,
      productDetailsInMemoryRepository,
    )
  })

  it("should change produtc detail activation", async () => {
    const productId = ProductIdMother.one()
    const initialProductDetail = ProductDetailMohther.oneOfProductId(productId)

    productDetailsInMemoryRepository.reset(initialProductDetail)

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const enabled = false
    const ocurredOn = new Date()
    const command = new ChangeProductDetailActivation(
      auth,
      productId,
      enabled,
      ocurredOn
    )

    const result = await changeProductDetailActivationHandler.execute(command)

    const expectedMetadata = initialProductDetail.metadata.copyOf({
      updatedBy: auth.username,
      updatedAt: now
    })

    const expected = initialProductDetail.copyOf({
      isEnabled: enabled,
      activationOccurredOn: ocurredOn,
      metadata: expectedMetadata
    })

    expect(result).toStrictEqual(expected)

    const dbProductDetail = await productDetailsInMemoryRepository.findById(productId)

    expect(dbProductDetail).toStrictEqual(expected)
  })

  it("should do nothing when event is previous", async () => {
    const productId = ProductIdMother.one()
    const initialProductDetail = ProductDetailMohther.oneOfProductId(productId)

    productDetailsInMemoryRepository.reset(initialProductDetail)

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const enabled = false
    const ocurredOn = DateUtil.subtractMinutes(initialProductDetail.activationOccurredOn, 5)
    const command = new ChangeProductDetailActivation(
      auth,
      productId,
      enabled,
      ocurredOn
    )

    const result = await changeProductDetailActivationHandler.execute(command)

    expect(result).toStrictEqual(initialProductDetail)

    const dbProductDetail = await productDetailsInMemoryRepository.findById(productId)

    expect(dbProductDetail).toStrictEqual(initialProductDetail)
  })

  it("should throw error when product detail not found", async () => {
    productDetailsInMemoryRepository.reset()

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const productId = ProductIdMother.one()
    const enabled = false
    const ocurredOn = new Date()
    const command = new ChangeProductDetailActivation(
      auth,
      productId,
      enabled,
      ocurredOn
    )

    expect(changeProductDetailActivationHandler.execute(command))
      .rejects
      .toBeInstanceOf(ProductDetailNotFoundException)
  })
})

