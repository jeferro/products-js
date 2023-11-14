import 'reflect-metadata'

import { LoggerCreator, Logger, AuthMother, FakeTimeService, Metadata, DateUtil } from 'jf-architecture'
import { Mock, mockInterface } from 'jf-mocks'
import { ProductDetailInMemoryRepository } from '../adapters/in-memory/ProductDetailInMemoryRepository'
import { ProductDetailMohther } from '../projections/ProductDetail.mother.spec'
import { UpsertProductDetailHandler } from './UpsertProductDetailHandler'
import { UpsertProductDetail } from './commands/UpsertProductDetail'
import { ProductDetail } from '../projections/ProductDetail'
import { Reviews } from '../projections/Reviews'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'


describe(`${UpsertProductDetailHandler.name}`, () => {
  let logger: Mock<Logger>

  let loggerCreator: Mock<LoggerCreator>

  let productDetailsInMemoryRepository: ProductDetailInMemoryRepository

  let upsertProductDetailHandler: UpsertProductDetailHandler

  beforeAll(async () => {
    logger = mockInterface<Logger>()
    loggerCreator = mockInterface<LoggerCreator>()
    loggerCreator.ofObject.mockReturnValue(logger)

    productDetailsInMemoryRepository = new ProductDetailInMemoryRepository()

    upsertProductDetailHandler = new UpsertProductDetailHandler(
      loggerCreator,
      productDetailsInMemoryRepository,
    )
  })

  it("should create product detail", async () => {
    productDetailsInMemoryRepository.reset()

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const productId = ProductIdMother.one()
    const title = 'updated title'
    const description = 'updated description'
    const enabled = true
    const ocurredOn = new Date()
    const command = new UpsertProductDetail(
      auth,
      productId,
      title,
      description,
      enabled,
      ocurredOn
    )

    const result = await upsertProductDetailHandler.execute(command)

    const expectedMetadata = new Metadata(
      auth.username,
      now,
      auth.username,
      now
    )

    const expected = new ProductDetail(
      productId,
      title,
      description,
      enabled,
      ocurredOn,
      ocurredOn,
      Reviews.empty(),
      expectedMetadata
    )

    expect(result).toStrictEqual(expected)

    const dbProductDetail = await productDetailsInMemoryRepository.findById(productId)

    expect(dbProductDetail).toStrictEqual(expected)
  })

  it("should update product detail", async () => {
    const productId = ProductIdMother.one()
    const updatedTitle = 'updated title'
    const updatedDescription = 'updated description'

    const initialProductDetail = ProductDetailMohther.oneOfProductId(productId)

    productDetailsInMemoryRepository.reset(initialProductDetail)

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const ocurredOn = new Date()
    const command = new UpsertProductDetail(
      auth,
      productId,
      updatedTitle,
      updatedDescription,
      undefined,
      ocurredOn
    )

    const result = await upsertProductDetailHandler.execute(command)

    const expectedMetadata = initialProductDetail.metadata.copyOf({
      updatedBy: auth.username,
      updatedAt: now
    })

    const expected = initialProductDetail.copyOf({
      title: updatedTitle,
      description: updatedDescription,
      infoOccurredOn: ocurredOn,
      metadata: expectedMetadata
    })

    expect(result).toStrictEqual(expected)

    const dbProductDetail = await productDetailsInMemoryRepository.findById(productId)

    expect(dbProductDetail).toStrictEqual(expected)
  })

  it("shouldn't update product detail when event is previous", async () => {
    const productId = ProductIdMother.one()
    const updatedTitle = 'updated title'
    const updatedDescription = 'updated description'

    const initialProductDetail = ProductDetailMohther.oneOfProductId(productId)

    productDetailsInMemoryRepository.reset(initialProductDetail)

    const now = FakeTimeService.configureOneMinuteLater()

    const auth = AuthMother.oneUserAuth()
    const ocurredOn = DateUtil.subtractMinutes(initialProductDetail.infoOccurredOn, 5)
    const command = new UpsertProductDetail(
      auth,
      productId,
      updatedTitle,
      updatedDescription,
      undefined,
      ocurredOn
    )

    const result = await upsertProductDetailHandler.execute(command)

    expect(result).toStrictEqual(initialProductDetail)

    const dbProductDetail = await productDetailsInMemoryRepository.findById(productId)

    expect(dbProductDetail).toStrictEqual(initialProductDetail)
  })

})

