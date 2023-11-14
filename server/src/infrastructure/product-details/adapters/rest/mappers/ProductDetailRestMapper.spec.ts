import { ReviewRestMapper } from './ReviewRestMapper'
import { ProductDetailRestMapper } from './ProductDetailRestMapper'
import { ProductDetailMohther } from 'src/infrastructure/product-details/projections/ProductDetail.mother.spec'
import { ProductDetailRestDTO } from 'src/infrastructure-components/rest/product-details/dtos/ProductDetailRestDTO'
import { ProductIdRestMapper } from 'src/infrastructure/products/adapters/rest/mappers/ProductIdRestMapper'
import { MetadataRestMapper } from 'src/infrastructure/shared/adapters/rest/mappers/MetadataRestMapper'

describe(`${ProductDetailRestMapper.name}`, () => {

  const productIdRestMapper = new ProductIdRestMapper()

    const reviewRestMapper = new ReviewRestMapper()

    const metadataRestMapper = new MetadataRestMapper()

  let productRestMapper = new ProductDetailRestMapper()

  it('should map to dto', () => {
    const productDetail = ProductDetailMohther.one()

    const result = productRestMapper.toDTO(productDetail)

    const expected = new ProductDetailRestDTO(
      productIdRestMapper.toDTO(productDetail.id),
      productDetail.title,
      productDetail.description,
      productDetail.isEnabled,
      reviewRestMapper.reviewsToDTOS(productDetail.reviews),
      metadataRestMapper.toDTO(productDetail.metadata)
    )

    expect(result).toStrictEqual(expected)
  })
})
