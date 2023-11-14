import { LoggerCreator, BaseCommandHandler, CommandHandler } from 'jf-architecture'
import { DeleteProductDetail } from './commands/DeleteProductDetail'
import { ProductDetailNotFoundException } from '../exceptions/ProductDetailNotFoundException'
import { ProductDetailsRepository } from '../repositories/ProductDetailsRepository'
import { ProductDetail } from '../projections/ProductDetail'


@CommandHandler(DeleteProductDetail)
export class DeleteProductDetailHandler extends BaseCommandHandler<DeleteProductDetail, ProductDetail> {
  constructor(
    loggerCreator: LoggerCreator,
    private readonly productDetailsRepository: ProductDetailsRepository
  ) {
    super(ProductDetail, loggerCreator)
  }

  protected async handle(params: DeleteProductDetail): Promise<ProductDetail> {
    const productId = params.productId

    const productDetail = await this.productDetailsRepository.findById(productId)

    if(!productDetail) {
      throw ProductDetailNotFoundException.of(productId)
    }

    await this.productDetailsRepository.deleteById(productId)

    return productDetail
  }
}
