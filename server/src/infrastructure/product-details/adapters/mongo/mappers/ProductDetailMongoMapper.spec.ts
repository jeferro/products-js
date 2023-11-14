import { ReviewMongoMapper } from './ReviewMongoMapper'
import { ReviewMongoDTOMother } from 'src/infrastructure-components/mongo/product-details/dtos/ReviewMongoDTO.mother.spec'
import { ReviewMother } from 'src/infrastructure/product-details/projections/Review.mother.spec'
import { ProductDetailMongoMapper } from './ProductDetailMongoMapper'
import { ProductDetailMongoDTOMother } from 'src/infrastructure-components/mongo/product-details/dtos/ProductDetailMongoDTO.mother.spec'
import { ProductDetailMohther } from 'src/infrastructure/product-details/projections/ProductDetail.mother.spec'

describe(`${ProductDetailMongoMapper.name}`, () => {
  let productDetailMongoMapper = new ProductDetailMongoMapper()

  it('should map to entity', () => {
    const productDetailDTO = ProductDetailMongoDTOMother.one()

    const productDetail = productDetailMongoMapper.toEntity(productDetailDTO)
    const result = productDetailMongoMapper.toDTO(productDetail)

    expect(result).toEqual(productDetailDTO)
  })

  it('should map to dto', () => {
    const productDetail = ProductDetailMohther.one()

    const productDetailDTO = productDetailMongoMapper.toDTO(productDetail)
    const result = productDetailMongoMapper.toEntity(productDetailDTO)

    expect(result).toStrictEqual(productDetail)
  })
})
