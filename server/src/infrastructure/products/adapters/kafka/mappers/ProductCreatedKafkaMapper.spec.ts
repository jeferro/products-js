import 'reflect-metadata'

import { ProductCreatedKafkaMapper } from './ProductCreatedKafkaMapper'
import { ProductCreatedMother } from 'src/domain/products/events/ProductCreated.mother.spec'
import { ProductCreatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductCreatedKafkaDTO.mother.spec'

describe(`${ProductCreatedKafkaMapper.name}`, () => {
  let productCreatedKafkaMapper = new ProductCreatedKafkaMapper()

  it('should map to dto', () => {
    const event = ProductCreatedMother.one()

    const eventDTO = productCreatedKafkaMapper.toDTO(event)
    const result = productCreatedKafkaMapper.toEntity(eventDTO)

    expect(result).toStrictEqual(event)
  })

  it('should map to entity', () => {
    const eventDTO = ProductCreatedKafkaDTOMother.one()

    const event = productCreatedKafkaMapper.toEntity(eventDTO)
    const result = productCreatedKafkaMapper.toDTO(event)

    expect(result).toStrictEqual(eventDTO)
  })
})
