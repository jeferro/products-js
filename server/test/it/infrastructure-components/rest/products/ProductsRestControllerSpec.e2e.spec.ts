import { HttpStatus } from '@nestjs/common'
import { RestControllerTestBootstraper } from '../RestControllerTestBootstraper'
import { ProductsRestControllerMock } from './ProductsRestControllerMock'
import { ProductRestDTO } from 'src/infrastructure-components/rest/products/dtos/ProductRestDTO'
import { ProductRestDTOMother } from 'src/infrastructure-components/rest/products/dtos/ProductRestDTO.mother.spec'
import { UpsertProductRestInput } from 'src/infrastructure-components/rest/products/inputs/UpsertProductRestInput'
import { ChangeProductActivationRestInput } from 'src/infrastructure-components/rest/products/inputs/ChangeProductActivationRestInput'
import { AuthRestDTOMother } from 'jf-nestjs-rest'
import { ProductsRestControllerSpec } from 'src/infrastructure-components/rest/products/ProductsRestControllerSpec'

describe(`${ProductsRestControllerSpec.name} (e2e)`, () => {
  let testBootstraper = new RestControllerTestBootstraper()

  let productsRestControllerMock: ProductsRestControllerMock

  let authRestDTO = AuthRestDTOMother.one()

  beforeAll(async () => {
    productsRestControllerMock = await testBootstraper.start(
      ProductsRestControllerMock,
      authRestDTO
    )
  })

  afterAll(async () => {
    await testBootstraper.stop()
  })

  describe('List products', () => {
    it('should list products', async () => {
      const expetedProductDTOS = [
        ProductRestDTOMother.oneEnabled(),
        ProductRestDTOMother.twoEnabled()
      ]
      productsRestControllerMock.onListProductsMock.mockResolvedValue(expetedProductDTOS)

      return testBootstraper.get(`/products`)
        .expect(HttpStatus.OK)
        .then((response) => {
          checkListProductsParams(
            productsRestControllerMock.onListProductsMock.mock.calls[0]
          )

          checkProductsResult(
            response.body,
            expetedProductDTOS
          )
        })
    })
  })

  describe('Create product', () => {
    it('should create product', async () => {
      const expectedProductDTO = ProductRestDTOMother.oneEnabled()
      productsRestControllerMock.onUpsertProductMock.mockResolvedValue(expectedProductDTO)

      const productIdDTO = expectedProductDTO.id
      const inputDTO = new UpsertProductRestInput(
        'new title',
        'new description'
      )

      return testBootstraper.put(`/products/${productIdDTO}`)
        .send(inputDTO)
        .expect(HttpStatus.OK)
        .then((response) => {
          checkUpsertProductParams(
            productsRestControllerMock.onUpsertProductMock.mock.calls[0],
            productIdDTO,
            inputDTO
          )

          checkProductResult(
            response.body,
            expectedProductDTO
          )
        })
    })
  })

  describe('Get product', () => {
    it('should get product', async () => {
      const expectedProductDTO = ProductRestDTOMother.oneEnabled()
      productsRestControllerMock.onGetProductMock.mockResolvedValue(expectedProductDTO)

      const productIdDTO = expectedProductDTO.id

      return testBootstraper.get(`/products/${productIdDTO}`)
        .expect(HttpStatus.OK)
        .then((response) => {
          checkGetProductParams(
            productsRestControllerMock.onGetProductMock.mock.calls[0],
            productIdDTO
          )

          checkProductResult(
            response.body,
            expectedProductDTO
          )
        })
    })
  })

  describe('Enable product', () => {
    it('should enable product', async () => {
      const expectedProductDTO = ProductRestDTOMother.oneEnabled()
      productsRestControllerMock.onChangeProductActivationMock.mockResolvedValue(expectedProductDTO)

      const productIdDTO = expectedProductDTO.id
      const inputDTO = new ChangeProductActivationRestInput(
        true
      )

      return testBootstraper.put(`/products/${productIdDTO}/enable`)
        .send(inputDTO)
        .expect(HttpStatus.OK)
        .then((response) => {
          checkEnableProductParams(
            productsRestControllerMock.onChangeProductActivationMock.mock.calls[0],
            productIdDTO,
            inputDTO
          )

          checkProductResult(
            response.body,
            expectedProductDTO
          )
        })
    })
  })

  describe('Disable product', () => {
    it('should disable product', async () => {
      const expectedProductDTO = ProductRestDTOMother.oneDisabled()
      productsRestControllerMock.onChangeProductActivationMock.mockReset()
      productsRestControllerMock.onChangeProductActivationMock.mockResolvedValue(expectedProductDTO)

      const productIdDTO = expectedProductDTO.id
      const inputDTO = new ChangeProductActivationRestInput(
        false
      )

      return testBootstraper.put(`/products/${productIdDTO}/enable`)
        .send(inputDTO)
        .expect(HttpStatus.OK)
        .then((response) => {
          checkEnableProductParams(
            productsRestControllerMock.onChangeProductActivationMock.mock.calls[0],
            productIdDTO,
            inputDTO
          )

          checkProductResult(
            response.body,
            expectedProductDTO
          )
        })
    })
  })

  describe('Delete product', () => {
    it('should delete product', async () => {
      const expectedProductDTO = ProductRestDTOMother.oneEnabled()
      productsRestControllerMock.onDeleteProductMock.mockResolvedValue(expectedProductDTO)

      const productIdDTO = expectedProductDTO.id

      return testBootstraper.delete(`/products/${productIdDTO}`)
        .expect(HttpStatus.OK)
        .then((response) => {
          checkDeleteProductParams(
            productsRestControllerMock.onDeleteProductMock.mock.calls[0],
            productIdDTO
          )

          checkProductResult(
            response.body,
            expectedProductDTO
          )
        })
    })
  })

  function checkListProductsParams(
    params: any
  ) {
    expect(params[0]).toStrictEqual(authRestDTO)
  }

  function checkUpsertProductParams(
    params: any,
    productIdDTO: string,
    inputDTO: UpsertProductRestInput
  ) {
    expect(params[0]).toStrictEqual(authRestDTO)
    expect(params[1]).toEqual(productIdDTO)
    expect(params[2]).toEqual(inputDTO)
  }

  function checkGetProductParams(
    params: any[],
    productIdDTO: string
  ) {
    expect(params[0]).toStrictEqual(authRestDTO)
    expect(params[1]).toEqual(productIdDTO)
  }

  function checkEnableProductParams(
    params: any,
    productIdDTO: string,
    inputDTO: ChangeProductActivationRestInput
  ) {
    expect(params[0]).toStrictEqual(authRestDTO)
    expect(params[1]).toEqual(productIdDTO)
    expect(params[2]).toEqual(inputDTO)
  }

  function checkDeleteProductParams(
    params: any, 
    productIdDTO: string
  ) {
    expect(params[0]).toStrictEqual(authRestDTO)
    expect(params[1]).toEqual(productIdDTO)
  }

  function checkProductsResult(
    data: Record<string, any>[],
    expected: ProductRestDTO[],
  ) {
    expect(data.length).toEqual(expected.length)

    for (let i = 0; i < data.length; i++) {
      checkProductResult(data[i], expected[i])
    }
  }

  function checkProductResult(
    data: Record<string, any>,
    expected: ProductRestDTO
  ) {
    expect(data.id).toEqual(expected.id)
    expect(data.title).toEqual(expected.title)
    expect(data.description).toEqual(expected.description)
    expect(data.enabled).toEqual(expected.enabled)
    expect(data.metadata.createdBy).toEqual(expected.metadata.createdBy)
    expect(data.metadata.createdAt).toEqual(expected.metadata.createdAt.toISOString())
    expect(data.metadata.updatedBy).toEqual(expected.metadata.updatedBy)
    expect(data.metadata.updatedAt).toEqual(expected.metadata.updatedAt.toISOString())
  }
})
