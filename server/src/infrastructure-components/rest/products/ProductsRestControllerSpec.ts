import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
} from '@nestjs/common'
import { ProductRestDTO } from './dtos/ProductRestDTO'
import { UpsertProductRestInput } from './inputs/UpsertProductRestInput'
import { ChangeProductActivationRestInput } from './inputs/ChangeProductActivationRestInput'
import { Request } from 'express'
import { AuthRestDTO, RestAuthService, RestController } from 'jf-nestjs-rest'


@Controller()
export abstract class ProductsRestControllerSpec extends RestController {

  constructor(
    private readonly restAuthService: RestAuthService,
  ) {
    super()
  }

  @Get('/products')
  async list(
    @Req() request: Request
  ): Promise<ProductRestDTO[]> {
    const authDTO = await this.restAuthService.getAuthDTO(request)

    return this.onListProducts(authDTO)
  }

  abstract onListProducts(
    authDTO: AuthRestDTO | undefined,
  ): Promise<ProductRestDTO[]>

  @Put('/products/:productId')
  async upsert(
    @Req() request: Request,
    @Param('productId') productIdDTO: string,
    @Body() input: UpsertProductRestInput,
  ): Promise<ProductRestDTO> {
    const authDTO = await this.restAuthService.getAuthDTO(request)

    return this.onUpsertProduct(authDTO, productIdDTO, input)
  }

  abstract onUpsertProduct(
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string,
    input: UpsertProductRestInput
  ): Promise<ProductRestDTO>

  @Get('/products/:productId')
  async get(
    @Req() request: Request,
    @Param('productId') productIdDTO: string
  ): Promise<ProductRestDTO> {
    const authDTO = await this.restAuthService.getAuthDTO(request)

    return this.onGetProduct(authDTO, productIdDTO)
  }

  abstract onGetProduct(
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string
  ): Promise<ProductRestDTO>

  @Put('/products/:productId/enable')
  async changeProductActivation(
    @Req() request: Request,
    @Param('productId') productIdDTO: string,
    @Body() input: ChangeProductActivationRestInput,
  ): Promise<ProductRestDTO> {
    const authDTO = await this.restAuthService.getAuthDTO(request)

    return this.onChangeProductActivation(authDTO, productIdDTO, input)
  }

  abstract onChangeProductActivation(
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string,
    input: ChangeProductActivationRestInput,
  ): Promise<ProductRestDTO>

  @Delete('/products/:productId')
  async delete(
    @Req() request: Request,
    @Param('productId') productIdDTO: string): Promise<ProductRestDTO> {
    const authDTO = await this.restAuthService.getAuthDTO(request)

    return this.onDeleteProduct(authDTO, productIdDTO)
  }

  abstract onDeleteProduct(
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string
  ): Promise<ProductRestDTO>
}
