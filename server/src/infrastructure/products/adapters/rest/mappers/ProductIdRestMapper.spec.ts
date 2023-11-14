import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'
import { ProductIdRestMapper } from './ProductIdRestMapper'

describe(`${ProductIdRestMapper.name}`, () => {
  let productIdRestMapper = new ProductIdRestMapper()

  it('should map to entity', () => {
    const productIdDTO = 'product-one'

    const productId = productIdRestMapper.toEntity(productIdDTO)
    const result = productIdRestMapper.toDTO(productId)

    expect(result).toEqual(productIdDTO)
  })

  it('should map to dto', () => {
    const productId = ProductIdMother.one()

    const productIdDTO = productIdRestMapper.toDTO(productId)
    const result = productIdRestMapper.toEntity(productIdDTO)

    expect(result).toStrictEqual(productId)
  })
})
