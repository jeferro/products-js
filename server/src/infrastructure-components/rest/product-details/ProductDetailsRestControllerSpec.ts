import {
  Controller,
  Get,
  Param,
  Req,
} from '@nestjs/common'
import { ProductDetailRestDTO } from './dtos/ProductDetailRestDTO'
import { Request } from 'express'
import { AuthRestDTO, RestAuthService, RestController } from 'jf-nestjs-rest'


@Controller()
export abstract class ProductDetailsRestControllerSpec extends RestController {

  constructor(
    private readonly restAuthService: RestAuthService,
  ) {
    super()
  }

  @Get('/product-details/:productId')
  async upsert(
    @Req() request: Request,
    @Param('productId') productIdDTO: string,
  ): Promise<ProductDetailRestDTO> {
    const authDTO = await this.restAuthService.getAuthDTO(request)

    return this.onGetProductDetail(
      authDTO, 
      productIdDTO
    )
  }

  abstract onGetProductDetail(
    authDTO: AuthRestDTO | undefined,
    productIdDTO: string
  ): Promise<ProductDetailRestDTO>
}
