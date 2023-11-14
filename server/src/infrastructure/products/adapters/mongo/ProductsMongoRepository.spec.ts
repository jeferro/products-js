import { mockClass } from 'jf-mocks'
import { ProductsMongoRepository } from './ProductsMongoRepository'
import { ProductsMongoClient } from 'src/infrastructure-components/mongo/products/ProductsMongoClient'
import { ProductMongoMapper } from './mappers/ProductMongoMapper'
import { ProductIdMongoMapper } from './mappers/ProductIdMongoMapper'
import { ProductMother } from 'src/domain/products/entities/Product.mother.spec'
import { Product } from 'src/domain/products/entities/Product'
import { ProductMongoDTOMother } from 'src/infrastructure-components/mongo/products/dtos/products/ProductMongoDTO.mother.spec'
import { ProductIdMother } from 'src/domain/products/entities/ProductId.mother.spec'
import { ProductMongoDTO } from 'src/infrastructure-components/mongo/products/dtos/products/ProductMongoDTO'
import { ProductId } from 'src/domain/products/entities/ProductId'
import { Products } from 'src/domain/products/entities/Products'


describe(`${ProductsMongoRepository.name}`, () => {
  const productIdMongoMapper = new ProductIdMongoMapper()

  const productMongoMapper = new ProductMongoMapper()

  const productsMongoClient = mockClass(ProductsMongoClient)

  const productsMongoRepository = new ProductsMongoRepository(
    productsMongoClient
  )

  it('should save product', async () => {
    productsMongoClient.save.mockResolvedValue()

    const product = ProductMother.oneEnabled()

    await productsMongoRepository.save(product)

    checkSaveParams(
      productsMongoClient.save.mock.calls[0],
      product
    )
  })

  it('should find product by id', async () => {
    const expectedDTO = ProductMongoDTOMother.oneEnabled()
    productsMongoClient.findById.mockResolvedValue(expectedDTO)

    const productId = ProductIdMother.one()

    const result = await productsMongoRepository.findById(productId)

    checkFindByIdParams(
      productsMongoClient.findById.mock.calls[0],
      productId
    )

    checkProductResult(
      result,
      expectedDTO
    )
  })

  it('should find product by id', async () => {
    productsMongoClient.deleteById.mockResolvedValue()

    const productId = ProductIdMother.one()

    await productsMongoRepository.deleteById(productId)

    checkDeleteByIdParams(
      productsMongoClient.deleteById.mock.calls[0],
      productId
    )
  })

  it('should find all products', async () => {
    const expectedDTOS = [
      ProductMongoDTOMother.oneEnabled(),
    ]
      
    productsMongoClient.findAll.mockResolvedValue(expectedDTOS)

    const result = await productsMongoRepository.findAll()

    checkProductsResult(
      result,
      expectedDTOS
    )
  })

  function checkSaveParams(
    params: any[],
    product: Product
  ) {
    const productDTO = productMongoMapper.toDTO(product)

    expect(params[0]).toEqual(productDTO)
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

  function checkProductResult(
    result: Product | undefined,
    expectedDTO: ProductMongoDTO
  ) {
    const expected = productMongoMapper.toEntity(expectedDTO)

    expect(result).toEqual(expected)
  }

  function checkProductsResult(
    result: Products,
    expectedDTOS: ProductMongoDTO[]
  ) {
    const expected = productMongoMapper.toProducts(expectedDTOS)

    expect(result).toEqual(expected)
  }

})
