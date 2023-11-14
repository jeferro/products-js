import { Controller } from '@nestjs/common'
import { ProductIdRestMapper } from './mappers/ProductIdRestMapper'
import { ProductRestMapper } from './mappers/ProductRestMapper'
import { CommandBus, QueryBus } from 'jf-architecture'
import { AuthRestMapper } from 'src/infrastructure/auth/adapters/rest/mappers/AuthRestMapper'
import { Products } from 'src/domain/products/entities/Products'
import { Product } from 'src/domain/products/entities/Product'
import { DeleteProduct } from 'src/application/products/commands/DeleteProduct'
import { ListProducts } from 'src/application/products/queries/ListProducts'
import { UpsertProduct } from 'src/application/products/commands/UpsertProduct'
import { GetProduct } from 'src/application/products/queries/GetProduct'
import { ChangeProductActivation } from 'src/application/products/commands/ChangeProductActivation'
import { ProductRestDTO } from 'src/infrastructure-components/rest/products/dtos/ProductRestDTO'
import { UpsertProductRestInput } from 'src/infrastructure-components/rest/products/inputs/UpsertProductRestInput'
import { RestAuthService, AuthRestDTO } from 'jf-nestjs-rest'
import { ChangeProductActivationRestInput } from 'src/infrastructure-components/rest/products/inputs/ChangeProductActivationRestInput'
import { ProductsRestControllerSpec } from 'src/infrastructure-components/rest/products/ProductsRestControllerSpec'

@Controller()
export class ProductsRestController extends ProductsRestControllerSpec {

  private readonly authRestMapper = new AuthRestMapper()

  private readonly productIdRestMapper = new ProductIdRestMapper()

  private readonly productRestMapper = new ProductRestMapper()

  constructor(
    restAuthService: RestAuthService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
    super(restAuthService)
  }

  async onListProducts(
    authDTO: AuthRestDTO | undefined
  ): Promise<ProductRestDTO[]> {
    const query = new ListProducts(
      this.authRestMapper.toEntity(authDTO)
    )

    const products = await this.queryBus.execute<Products>(query)

    return this.productRestMapper.productsToDTOS(products)
  }

  async onUpsertProduct(
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string,
    input: UpsertProductRestInput
  ): Promise<ProductRestDTO> {
    const command = new UpsertProduct(
      this.authRestMapper.toEntity(authDTO),
      this.productIdRestMapper.toEntity(productIdDTO),
      input.title,
      input.description,
    )

    const product = await this.commandBus.execute<Product>(command)

    return this.productRestMapper.toDTO(product)
  }

  async onGetProduct(
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string
  ): Promise<ProductRestDTO> {
    const query = new GetProduct(
      this.authRestMapper.toEntity(authDTO),
      this.productIdRestMapper.toEntity(productIdDTO),
    )

    const product = await this.queryBus.execute<Product>(query)

    return this.productRestMapper.toDTO(product)
  }

  async onChangeProductActivation(
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string,
    input: ChangeProductActivationRestInput,
  ): Promise<ProductRestDTO> {
    const command = new ChangeProductActivation(
      this.authRestMapper.toEntity(authDTO),
      this.productIdRestMapper.toEntity(productIdDTO),
      input.enable
    )

    const product = await this.commandBus.execute<Product>(command)

    return this.productRestMapper.toDTO(product)
  }

  async onDeleteProduct(
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string
  ): Promise<ProductRestDTO> {
    const command = new DeleteProduct(
      this.authRestMapper.toEntity(authDTO),
      this.productIdRestMapper.toEntity(productIdDTO),
    )

    const product = await this.commandBus.execute<Product>(command)

    return this.productRestMapper.toDTO(product)
  }
}
