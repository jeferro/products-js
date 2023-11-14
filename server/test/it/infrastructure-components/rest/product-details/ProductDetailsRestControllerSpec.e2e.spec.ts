import { HttpStatus } from '@nestjs/common'
import { RestControllerTestBootstraper } from '../RestControllerTestBootstraper'
import { AuthRestDTOMother } from 'jf-nestjs-rest'
import { ProductDetailsRestControllerSpec } from 'src/infrastructure-components/rest/product-details/ProductDetailsRestControllerSpec'
import { ProductDetailsRestControllerMock } from './ProductDetailsRestControllerMock'
import { ProductDetailRestDTOMother } from 'src/infrastructure-components/rest/product-details/dtos/ProductDetailRestDTO.mother.spec'
import { ProductDetailRestDTO } from 'src/infrastructure-components/rest/product-details/dtos/ProductDetailRestDTO'


describe(`${ProductDetailsRestControllerSpec.name} (e2e)`, () => {
  let testBootstraper = new RestControllerTestBootstraper()

  let productDetailsRestControllerMock: ProductDetailsRestControllerMock

  let authRestDTO = AuthRestDTOMother.one()

  beforeAll(async () => {
    productDetailsRestControllerMock = await testBootstraper.start(
      ProductDetailsRestControllerMock,
      authRestDTO
    )
  })

  afterAll(async () => {
    await testBootstraper.stop()
  })

  describe('Get product detail', () => {
    it('should get product detail', async () => {
      const expectedProductDTO = ProductDetailRestDTOMother.one()
      productDetailsRestControllerMock.onGetProductDetailMock.mockResolvedValue(expectedProductDTO)

      const productIdDTO = expectedProductDTO.id

      return testBootstraper.get(`/product-details/${productIdDTO}`)
        .expect(HttpStatus.OK)
        .then((response) => {
          checkGetProductDetailParams(
            productDetailsRestControllerMock.onGetProductDetailMock.mock.calls[0],
            productIdDTO
          )

          checkProductDetailResult(
            response.body,
            expectedProductDTO
          )
        })
    })
  })


  function checkGetProductDetailParams(
    params: any[],
    productIdDTO: string
  ) {
    expect(params[0]).toStrictEqual(authRestDTO)
    expect(params[1]).toEqual(productIdDTO)
  }


  function checkProductDetailResult(
    data: Record<string, any>,
    expected: ProductDetailRestDTO
  ) {
    expect(data.id).toEqual(expected.id)
    expect(data.title).toEqual(expected.title)
    expect(data.description).toEqual(expected.description)
    expect(data.enabled).toEqual(expected.enabled)
    expect(data.reviews).toEqual(expected.reviews)
    expect(data.metadata.createdBy).toEqual(expected.metadata.createdBy)
    expect(data.metadata.createdAt).toEqual(expected.metadata.createdAt.toISOString())
    expect(data.metadata.updatedBy).toEqual(expected.metadata.updatedBy)
    expect(data.metadata.updatedAt).toEqual(expected.metadata.updatedAt.toISOString())
  }
})
