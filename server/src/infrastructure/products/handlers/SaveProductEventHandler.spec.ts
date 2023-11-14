import 'reflect-metadata'

import { LoggerCreator, Logger, AuthMother } from 'jf-architecture'
import { Mock, mockClass, mockInterface } from 'jf-mocks'
import { SaveProductEventHandler } from './SaveProductEventHandler'
import { ProductEventsMongoClient } from 'src/infrastructure-components/mongo/products/ProductEventsMongoClient'
import { ProductCreatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO.mother.spec'
import { SaveProductEvent } from './command/SaveProductEvent'
import { ProductCreatedMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductCreatedMongoDTO'
import { ProductCreatedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO'
import { ProductUpdatedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO'
import { ProductUpdatedMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductUpdatedMongoDTO'
import { ProductDeletedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO '
import { ProductDeletedMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductDeletedMongoDTO'
import { ProductUpdatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO.mother.spec'
import { ProductDeletedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO.mother.spec'
import { ProductActivationChangedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO.mother.spec'
import { ProductActivationChangedKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO'
import { ProductActivationChangedMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/events/ProductActivationChangedMongoDTO'

describe(`${SaveProductEventHandler.name}`, () => {
  let logger: Mock<Logger>

  let loggerCreator: Mock<LoggerCreator>

  let productEventsMongoClient = mockClass(ProductEventsMongoClient)

  let saveProductEventHandler: SaveProductEventHandler

  beforeAll(async () => {
    logger = mockInterface<Logger>()
    loggerCreator = mockInterface<LoggerCreator>()
    loggerCreator.ofObject.mockReturnValue(logger)

    saveProductEventHandler = new SaveProductEventHandler(
      loggerCreator,
      productEventsMongoClient
    )
  })

  beforeEach(() => {
    productEventsMongoClient.save.mockReset()
  })

  it("should save product created", async () => {
    const productCreatedKafka = ProductCreatedKafkaDTOMother.one()

    const auth = AuthMother.oneUserAuth()
    const command = new SaveProductEvent(
      auth,
      productCreatedKafka
    )

    await saveProductEventHandler.execute(command)

    checkCreatedParams(
      productEventsMongoClient.save.mock.calls[0],
      productCreatedKafka
    )
  })

  it("should save product updated", async () => {
    const productUpdatedKafka = ProductUpdatedKafkaDTOMother.one()

    const auth = AuthMother.oneUserAuth()
    const command = new SaveProductEvent(
      auth,
      productUpdatedKafka
    )

    await saveProductEventHandler.execute(command)

    checkUpdatedParams(
      productEventsMongoClient.save.mock.calls[0],
      productUpdatedKafka
    )
  })

  it("should save product activation changed", async () => {
    const productEnabledKafka = ProductActivationChangedKafkaDTOMother.one()

    const auth = AuthMother.oneUserAuth()
    const command = new SaveProductEvent(
      auth,
      productEnabledKafka
    )

    await saveProductEventHandler.execute(command)

    checkProductActivationChangedParams(
      productEventsMongoClient.save.mock.calls[0],
      productEnabledKafka
    )
  })

  it("should save product deleted", async () => {
    const productDeletedKafka = ProductDeletedKafkaDTOMother.one()

    const auth = AuthMother.oneUserAuth()
    const command = new SaveProductEvent(
      auth,
      productDeletedKafka
    )

    await saveProductEventHandler.execute(command)

    checkDeletedParams(
      productEventsMongoClient.save.mock.calls[0],
      productDeletedKafka
    )
  })

})


function checkCreatedParams(
  params: any[],
  productCreatedKafka: ProductCreatedKafkaDTO,
) {
  const expectedId = `${productCreatedKafka.productId}::${productCreatedKafka.ocurredOn.toISOString()}`

  const expected = new ProductCreatedMongoDTO(
    expectedId,
    productCreatedKafka.ocurredOn,
    productCreatedKafka.ocurredBy,
    productCreatedKafka.productId,
    productCreatedKafka.title,
    productCreatedKafka.description,
    productCreatedKafka.enabled
  )

  expect(params[0]).toStrictEqual(expected)
}

function checkUpdatedParams(
  params: any[],
  productUpdatedKafka: ProductUpdatedKafkaDTO,
) {
  const expectedId = `${productUpdatedKafka.productId}::${productUpdatedKafka.ocurredOn.toISOString()}`

  const expected = new ProductUpdatedMongoDTO(
    expectedId,
    productUpdatedKafka.ocurredOn,
    productUpdatedKafka.ocurredBy,
    productUpdatedKafka.productId,
    productUpdatedKafka.title,
    productUpdatedKafka.description
  )

  expect(params[0]).toStrictEqual(expected)
}


function checkProductActivationChangedParams(
  params: any[],
  productActivationChangedKafka: ProductActivationChangedKafkaDTO
) {
  const expectedId = `${productActivationChangedKafka.productId}::${productActivationChangedKafka.ocurredOn.toISOString()}`

  const expected = new ProductActivationChangedMongoDTO(
    expectedId,
    productActivationChangedKafka.ocurredOn,
    productActivationChangedKafka.ocurredBy,
    productActivationChangedKafka.productId,
    productActivationChangedKafka.enabled
  )

  expect(params[0]).toStrictEqual(expected)
}


function checkDeletedParams(
  params: any[],
  productDeletedKafka: ProductDeletedKafkaDTO
) {
  const expectedId = `${productDeletedKafka.productId}::${productDeletedKafka.ocurredOn.toISOString()}`

  const expected = new ProductDeletedMongoDTO(
    expectedId,
    productDeletedKafka.ocurredOn,
    productDeletedKafka.ocurredBy,
    productDeletedKafka.productId
  )

  expect(params[0]).toStrictEqual(expected)
}

