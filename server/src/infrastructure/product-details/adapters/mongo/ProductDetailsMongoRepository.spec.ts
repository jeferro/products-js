import { mockClass } from 'jf-mocks'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'
import { ProductId } from 'src/domain/products/entities/ProductId'
import { ProductDetailsMongoRepository } from './ProductDetailsMongoRepository'
import { ProductDetailsMongoClient } from 'src/infrastructure-components/mongo/product-details/ProductDetailsMongoClient'
import { ProductDetailMongoMapper } from './mappers/ProductDetailMongoMapper'
import { ProductIdMongoMapper } from 'src/infrastructure/products/adapters/mongo/mappers/ProductIdMongoMapper'
import { ProductDetailMohther } from '../../projections/ProductDetail.mother.spec'
import { ProductDetail } from '../../projections/ProductDetail'
import { ProductDetailMongoDTOMother } from 'src/infrastructure-components/mongo/product-details/dtos/ProductDetailMongoDTO.mother.spec'
import { ProductDetailMongoDTO } from 'src/infrastructure-components/mongo/product-details/dtos/ProductDetailMongoDTO'


describe(`${ProductDetailsMongoRepository.name}`, () => {
  const productDetailMongoMapper = new ProductDetailMongoMapper()

  const productIdMongoMapper = new ProductIdMongoMapper()

  const productDetailsMongoClient = mockClass(ProductDetailsMongoClient)

  const productsMongoRepository = new ProductDetailsMongoRepository(
    productDetailsMongoClient
  )

  it('should save product detail', async () => {
    productDetailsMongoClient.save.mockResolvedValue()

    const productDetail = ProductDetailMohther.one()

    await productsMongoRepository.save(productDetail)

    checkSaveParams(
      productDetailsMongoClient.save.mock.calls[0],
      productDetail
    )
  })

  it('should find product detail by id', async () => {
    const expectedDTO = ProductDetailMongoDTOMother.one()
    productDetailsMongoClient.findById.mockResolvedValue(expectedDTO)

    const productId = ProductIdMother.one()

    const result = await productsMongoRepository.findById(productId)

    checkFindByIdParams(
      productDetailsMongoClient.findById.mock.calls[0],
      productId
    )

    checkProductDetailResult(
      result,
      expectedDTO
    )
  })

  it('should find product by id', async () => {
    productDetailsMongoClient.deleteById.mockResolvedValue()

    const productId = ProductIdMother.one()

    await productsMongoRepository.deleteById(productId)

    checkDeleteByIdParams(
      productDetailsMongoClient.deleteById.mock.calls[0],
      productId
    )
  })

  function checkSaveParams(
    params: any[],
    productDetail: ProductDetail
  ) {
    const productDetailDTO = productDetailMongoMapper.toDTO(productDetail)

    expect(params[0]).toEqual(productDetailDTO)
  }

  function checkFindByIdParams(
    params: any[],
    productId: ProductId
  ) {
    const productIdDTO = productIdMongoMapper.toDTO(productId)

    expect(params[0]).toEqual(productIdDTO)
  }

  function checkDeleteByIdParams(
    params: any[],
    productId: ProductId
  ) {
    const productIdDTO = productIdMongoMapper.toDTO(productId)

    expect(params[0]).toEqual(productIdDTO)
  }

  function checkProductDetailResult(
    result: ProductDetail | undefined,
    expectedDTO: ProductDetailMongoDTO
  ) {
    const expected = productDetailMongoMapper.toEntity(expectedDTO)

    expect(result).toEqual(expected)
  }

})
