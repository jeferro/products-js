import { mockInterface } from 'jf-mocks'
import { RestAuthService, AuthRestDTO, AuthRestDTOMother } from 'jf-nestjs-rest'
import { AuthRestMapper } from 'src/infrastructure/auth/adapters/rest/mappers/AuthRestMapper'
import { QueryBus } from 'jf-architecture'
import { GetProduct } from 'src/application/products/queries/GetProduct'
import { ProductDetailsRestController } from './ProductDetailsRestController'
import { ProductDetailRestMapper } from './mappers/ProductDetailRestMapper'
import { ProductIdRestMapper } from 'src/infrastructure/products/adapters/rest/mappers/ProductIdRestMapper'
import { ProductDetailMohther } from '../../projections/ProductDetail.mother.spec'
import { GetProductDetail } from '../../handlers/queries/GetProductDetail'
import { ProductDetailRestDTO } from 'src/infrastructure-components/rest/product-details/dtos/ProductDetailRestDTO'
import { ProductDetail } from '../../projections/ProductDetail'


describe(`${ProductDetailsRestController.name}`, () => {
  
  const authRestMapper = new AuthRestMapper()

  const productIdRestMapper = new ProductIdRestMapper()

  const productDetailRestMapper = new ProductDetailRestMapper()

  const restAuthService = mockInterface<RestAuthService>()

  const queryBus = mockInterface<QueryBus>()

  const authRestController = new ProductDetailsRestController(
    restAuthService,
    queryBus
  )

  beforeEach(() => {
    queryBus.execute.mockReset()
  })

  it('should get product detail', async () => {
    const expected = ProductDetailMohther.one()
    queryBus.execute.mockResolvedValue(expected)

    const authDTO = AuthRestDTOMother.one()
    const productIdDTO = expected.id.value

    const result = await authRestController.onGetProductDetail(
      authDTO,
      productIdDTO
    )

    checkGetProductDetailQuery(
      queryBus.execute.mock.calls[0][0] as GetProductDetail,
      authDTO,
      productIdDTO
    )

    checkProductDetailResult(
      result,
      expected
    )
  })


  function checkGetProductDetailQuery(
    getProduct: GetProduct,
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string
  ) {
    expect(getProduct.auth).toEqual(authRestMapper.toEntity(authDTO))
    expect(getProduct.productId).toEqual(productIdRestMapper.toEntity(productIdDTO))
  }

  function checkProductDetailResult(
    result: ProductDetailRestDTO,
    expected: ProductDetail
  ) {
    const productDetailDTO = productDetailRestMapper.toDTO(expected)

    expect(result).toEqual(productDetailDTO)
  }

})
