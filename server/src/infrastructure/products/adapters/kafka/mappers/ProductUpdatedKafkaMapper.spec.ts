import 'reflect-metadata'

import { ProductUpdatedKafkaMapper } from './ProductUpdatedKafkaMapper'
import { ProductUpdatedMother } from 'src/domain/products/events/ProductUpdated.mother.spec'
import { ProductUpdatedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductUpdatedKafkaDTO.mother.spec'

describe(`${ProductUpdatedKafkaMapper.name}`, () => {
  let productUpdatedKafkaMapper = new ProductUpdatedKafkaMapper()

  it('should map to dto', () => {
    const event = ProductUpdatedMother.one()

    const eventDTO = productUpdatedKafkaMapper.toDTO(event)
    const result = productUpdatedKafkaMapper.toEntity(eventDTO)

    expect(result).toStrictEqual(event)
  })

  it('should map to entity', () => {
    const eventDTO = ProductUpdatedKafkaDTOMother.one()

    const event = productUpdatedKafkaMapper.toEntity(eventDTO)
    const result = productUpdatedKafkaMapper.toDTO(event)

    expect(result).toStrictEqual(eventDTO)
  })
})
