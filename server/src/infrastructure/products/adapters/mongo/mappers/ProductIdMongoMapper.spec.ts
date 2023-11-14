import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'
import { ProductIdMongoMapper } from './ProductIdMongoMapper'

describe(`${ProductIdMongoMapper.name}`, () => {
  let productIdMongoMapper = new ProductIdMongoMapper()

  it('should map to entity', () => {
    const productIdDTO = 'product-one'

    const productId = productIdMongoMapper.toEntity(productIdDTO)
    const result = productIdMongoMapper.toDTO(productId)

    expect(result).toEqual(productIdDTO)
  })

  it('should map to dto', () => {
    const productId = ProductIdMother.one()

    const productIdDTO = productIdMongoMapper.toDTO(productId)
    const result = productIdMongoMapper.toEntity(productIdDTO)

    expect(result).toStrictEqual(productId)
  })
})
