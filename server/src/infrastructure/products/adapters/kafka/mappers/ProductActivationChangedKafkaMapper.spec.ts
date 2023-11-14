import 'reflect-metadata'

import { ProductActivationChangedKafkaMapper } from './ProductActivationChangedKafkaMapper'
import { ProductActivationChangedKafkaDTOMother } from 'src/infrastructure-components/kafka/products/dtos/ProductActivationChangedKafkaDTO.mother.spec'
import { ProductActivationChangedMother } from 'src/domain/products/events/ProductActivationChanged.mother.spec'

describe(`${ProductActivationChangedKafkaMapper.name}`, () => {

  let productEnabledKafkaMapper = new ProductActivationChangedKafkaMapper()

  it('should map to dto', () => {
    const event = ProductActivationChangedMother.one()

    const eventDTO = productEnabledKafkaMapper.toDTO(event)
    const result = productEnabledKafkaMapper.toEntity(eventDTO)

    expect(result).toStrictEqual(event)
  })

  it('should map to entity', () => {
    const eventDTO = ProductActivationChangedKafkaDTOMother.one()

    const event = productEnabledKafkaMapper.toEntity(eventDTO)
    const result = productEnabledKafkaMapper.toDTO(event)

    expect(result).toStrictEqual(eventDTO)
  })
})
