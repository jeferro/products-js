import { ProductMother } from 'src/domain/products/entities/Product.mother.spec'
import { ProductMongoMapper } from './ProductMongoMapper'
import { ProductMongoDTOMother } from 'src/infrastructure-components/mongo/products/dtos/products/ProductMongoDTO.mother.spec'

describe(`${ProductMongoMapper.name}`, () => {
  let productMongoMapper = new ProductMongoMapper()

  it('should map to entity', () => {
    const productDTO = ProductMongoDTOMother.oneEnabled()

    const product = productMongoMapper.toEntity(productDTO)
    const result = productMongoMapper.toDTO(product)

    expect(result).toStrictEqual(productDTO)
  })

  it('should map to dto', () => {
    const product = ProductMother.oneEnabled()

    const productDTO = productMongoMapper.toDTO(product)
    const result = productMongoMapper.toEntity(productDTO)

    expect(result).toStrictEqual(product)
  })
})
