import 'reflect-metadata'

import { ProductDeletedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductDeletedKafkaDTO.mother.spec'
import { ProductDeletedKafkaMapper } from './ProductDeletedKafkaMapper'
import { ProductDeletedMother } from 'src/domain/products/events/ProductDeleted.mother.spec'

describe(`${ProductDeletedKafkaMapper.name}`, () => {
  let productDeletedKafkaMapper = new ProductDeletedKafkaMapper()

  it('should map to dto', () => {
    const event = ProductDeletedMother.one()

    const eventDTO = productDeletedKafkaMapper.toDTO(event)
    const result = productDeletedKafkaMapper.toEntity(eventDTO)

    expect(result).toStrictEqual(event)
  })

  it('should map to entity', () => {
    const eventDTO = ProductDeletedKafkaDTOMother.one()

    const event = productDeletedKafkaMapper.toEntity(eventDTO)
    const result = productDeletedKafkaMapper.toDTO(event)

    expect(result).toStrictEqual(eventDTO)
  })
})
