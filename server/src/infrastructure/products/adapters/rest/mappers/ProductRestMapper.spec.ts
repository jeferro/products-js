import { ProductMother } from 'src/domain/products/entities/Product.mother.spec'
import { ProductRestMapper } from './ProductRestMapper'
import { ProductRestDTO } from 'src/infrastructure-components/rest/products/dtos/ProductRestDTO'
import { MetadataRestDTO } from 'jf-nestjs-rest'

describe(`${ProductRestMapper.name}`, () => {
  let productRestMapper = new ProductRestMapper()

  it('should map to dto', () => {
    const product = ProductMother.oneEnabled()
    const metadata = product.metadata

    const result = productRestMapper.toDTO(product)

    const expectedMetadata = new MetadataRestDTO(
      metadata.createdBy.value,
      metadata.createdAt,
      metadata.updatedBy.value,
      metadata.updatedAt
    )
    const expected = new ProductRestDTO(
      product.id.value,
      product.title,
      product.description,
      product.isEnabled,
      expectedMetadata
    )

    expect(result).toStrictEqual(expected)
  })
})
