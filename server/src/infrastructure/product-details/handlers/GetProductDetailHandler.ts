import { LoggerCreator, QueryHandler, BaseQueryHandler } from 'jf-architecture'
import { DeleteProductDetail } from './commands/DeleteProductDetail'
import { ProductDetailNotFoundException } from '../exceptions/ProductDetailNotFoundException'
import { ProductDetailsRepository } from '../repositories/ProductDetailsRepository'
import { ProductDetail } from '../projections/ProductDetail'
import { GetProductDetail } from './queries/GetProductDetail'


@QueryHandler(GetProductDetail)
export class GetProductDetailHandler extends BaseQueryHandler<GetProductDetail, ProductDetail> {
  constructor(
    loggerCreator: LoggerCreator,
    private readonly productDetailsRepository: ProductDetailsRepository
  ) {
    super(ProductDetail, loggerCreator)
  }

  protected async handle(params: DeleteProductDetail): Promise<ProductDetail> {
    const productId = params.productId

    const productDetail = await this.productDetailsRepository.findById(productId)

    if(!productDetail || productDetail.isDisabled) {
      throw ProductDetailNotFoundException.of(productId)
    }

    return productDetail
  }
}
