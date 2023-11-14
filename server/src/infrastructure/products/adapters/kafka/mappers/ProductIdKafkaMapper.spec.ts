import { ProductIdKafkaMapper } from './ProductIdKafkaMapper'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'

describe(`${ProductIdKafkaMapper.name}`, () => {
  let productIdKafkaMapper = new ProductIdKafkaMapper()

  it('should map to dto', () => {
    const productId = ProductIdMother.one()

    const productIdDTO = productIdKafkaMapper.toDTO(productId)
    const result = productIdKafkaMapper.toEntity(productIdDTO)

    expect(result).toStrictEqual(productId)
  })

  it('should map to entity', () => {
    const productIdDTO = 'one-product'

    const productId = productIdKafkaMapper.toEntity(productIdDTO)
    const result = productIdKafkaMapper.toDTO(productId)

    expect(result).toStrictEqual(productIdDTO)
  })
})
