import { mockInterface } from 'jf-mocks'
import { RestAuthService, AuthRestDTO, AuthRestDTOMother } from 'jf-nestjs-rest'
import { CommandBus, QueryBus } from 'jf-architecture'
import { ProductsRestController } from './ProductsRestController'
import { AuthRestMapper } from 'src/infrastructure/auth/adapters/rest/mappers/AuthRestMapper'
import { ProductIdRestMapper } from './mappers/ProductIdRestMapper'
import { ProductRestMapper } from './mappers/ProductRestMapper'
import { ProductsMother } from 'src/domain/products/entities/Products.mother.spec'
import { ListProducts } from 'src/application/products/queries/ListProducts'
import { ProductRestDTO } from 'src/infrastructure-components/rest/products/dtos/ProductRestDTO'
import { Products } from 'src/domain/products/entities/Products'
import { ProductMother } from 'src/domain/products/entities/Product.mother.spec'
import { GetProduct } from 'src/application/products/queries/GetProduct'
import { Product } from 'src/domain/products/entities/Product'
import { UpsertProductRestInput } from 'src/infrastructure-components/rest/products/inputs/UpsertProductRestInput'
import { UpsertProduct } from 'src/application/products/commands/UpsertProduct'
import { ChangeProductActivationRestInput } from 'src/infrastructure-components/rest/products/inputs/ChangeProductActivationRestInput'
import { ChangeProductActivation } from 'src/application/products/commands/ChangeProductActivation'
import { DeleteProduct } from 'src/application/products/commands/DeleteProduct'


describe(`${ProductsRestController.name}`, () => {
  const authRestMapper = new AuthRestMapper()

  const productIdRestMapper = new ProductIdRestMapper()

  const productRestMapper = new ProductRestMapper()

  const restAuthService = mockInterface<RestAuthService>()

  const commandBus = mockInterface<CommandBus>()

  const queryBus = mockInterface<QueryBus>()

  const productsRestController = new ProductsRestController(
    restAuthService,
    commandBus,
    queryBus
  )

  beforeEach(() => {
    commandBus.execute.mockReset()
    queryBus.execute.mockReset()
  })

  it('should list products', async () => {
    const expected = ProductsMother.one()
    queryBus.execute.mockResolvedValue(expected)

    const authDTO = AuthRestDTOMother.one()

    const result = await productsRestController.onListProducts(authDTO)

    checkListProductsQuery(
      queryBus.execute.mock.calls[0][0] as ListProducts,
      authDTO
    )

    checkProductsResult(
      result,
      expected
    )
  })

  it('should upsert product', async () => {
    const expected = ProductMother.oneEnabled()
    commandBus.execute.mockResolvedValue(expected)

    const authDTO = AuthRestDTOMother.one()
    const productIdDTO = expected.id.value
    const inputDTO = new UpsertProductRestInput(
      'updated title',
      'updated description'
    )

    const result = await productsRestController.onUpsertProduct(
      authDTO,
      productIdDTO,
      inputDTO
    )

    checkUpsertProductCommand(
      commandBus.execute.mock.calls[0][0] as UpsertProduct,
      authDTO,
      productIdDTO,
      inputDTO
    )

    checkProductResult(
      result,
      expected
    )
  })

  it('should get product', async () => {
    const expected = ProductMother.oneEnabled()
    queryBus.execute.mockResolvedValue(expected)

    const authDTO = AuthRestDTOMother.one()
    const productIdDTO = expected.id.value

    const result = await productsRestController.onGetProduct(
      authDTO,
      productIdDTO
    )

    checkGetProductQuery(
      queryBus.execute.mock.calls[0][0] as GetProduct,
      authDTO,
      productIdDTO
    )

    checkProductResult(
      result,
      expected
    )
  })

  it('should enable product', async () => {
    const expected = ProductMother.oneEnabled()
    commandBus.execute.mockResolvedValue(expected)

    const authDTO = AuthRestDTOMother.one()
    const productIdDTO = expected.id.value
    const inputDTO = new ChangeProductActivationRestInput(
      true
    )

    const result = await productsRestController.onChangeProductActivation(
      authDTO,
      productIdDTO,
      inputDTO
    )

    checkChangeProductActivationCommand(
      commandBus.execute.mock.calls[0][0] as ChangeProductActivation,
      authDTO,
      productIdDTO
    )

    checkProductResult(
      result,
      expected
    )
  })

  it('should disable product', async () => {
    const expected = ProductMother.oneEnabled()
    commandBus.execute.mockResolvedValue(expected)

    const authDTO = AuthRestDTOMother.one()
    const productIdDTO = expected.id.value
    const inputDTO = new ChangeProductActivationRestInput(
      false
    )

    const result = await productsRestController.onChangeProductActivation(
      authDTO,
      productIdDTO,
      inputDTO
    )

    checkChangeProductActivationCommand(
      commandBus.execute.mock.calls[0][0] as ChangeProductActivation,
      authDTO,
      productIdDTO
    )

    checkProductResult(
      result,
      expected
    )
  })

  it('should delete product', async () => {
    const expected = ProductMother.oneEnabled()
    commandBus.execute.mockResolvedValue(expected)

    const authDTO = AuthRestDTOMother.one()
    const productIdDTO = expected.id.value

    const result = await productsRestController.onDeleteProduct(
      authDTO,
      productIdDTO
    )

    checkDeleteProductCommand(
      commandBus.execute.mock.calls[0][0] as DeleteProduct,
      authDTO,
      productIdDTO
    )

    checkProductResult(
      result,
      expected
    )
  })

  function checkListProductsQuery(
    listProducts: ListProducts,
    authDTO: AuthRestDTO | undefined,
  ) {
    expect(listProducts.auth).toEqual(authRestMapper.toEntity(authDTO))
  }

  function checkUpsertProductCommand(
    upsertProduct: UpsertProduct,
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string,
    inputDTO: UpsertProductRestInput
  ) {
    const auth = authRestMapper.toEntity(authDTO)
    const product = productIdRestMapper.toEntity(productIdDTO)

    expect(upsertProduct.auth).toEqual(auth)
    expect(upsertProduct.productId).toEqual(product)
    expect(upsertProduct.title).toEqual(inputDTO.title)
    expect(upsertProduct.description).toEqual(inputDTO.description)
  }

  function checkGetProductQuery(
    getProduct: GetProduct,
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string
  ) {
    const auth = authRestMapper.toEntity(authDTO)
    const product = productIdRestMapper.toEntity(productIdDTO)

    expect(getProduct.auth).toEqual(auth)
    expect(getProduct.productId).toEqual(product)
  }

  function checkChangeProductActivationCommand(
    changeProductActivation: ChangeProductActivation,
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string
  ) {
    const auth = authRestMapper.toEntity(authDTO)
    const product = productIdRestMapper.toEntity(productIdDTO)

    expect(changeProductActivation.auth).toEqual(auth)
    expect(changeProductActivation.productId).toEqual(product)
  }

  function checkDeleteProductCommand(
    deleteProduct: DeleteProduct,
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string
  ) {
    const auth = authRestMapper.toEntity(authDTO)
    const product = productIdRestMapper.toEntity(productIdDTO)

    expect(deleteProduct.auth).toEqual(auth)
    expect(deleteProduct.productId).toEqual(product)
  }

  function checkProductsResult(
    result: ProductRestDTO[],
    expected: Products
  ) {
    const expectedDTOS = productRestMapper.productsToDTOS(expected)

    expect(result).toEqual(expectedDTOS)
  }

  function checkProductResult(
    result: ProductRestDTO,
    expected: Product
  ) {
    const expectedDTO = productRestMapper.toDTO(expected)
    
    expect(result).toEqual(expectedDTO)
  }

})
