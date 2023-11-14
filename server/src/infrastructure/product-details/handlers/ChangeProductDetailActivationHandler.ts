import { LoggerCreator, BaseCommandHandler, CommandHandler } from 'jf-architecture'
import { ProductDetail } from '../projections/ProductDetail'
import { ProductDetailsRepository as productDetailsRepository } from '../repositories/ProductDetailsRepository'
import { ChangeProductDetailActivation } from './commands/ChangeActivationProductDetail'
import { ProductDetailNotFoundException } from '../exceptions/ProductDetailNotFoundException'


@CommandHandler(ChangeProductDetailActivation)
export class ChangeProductDetailActivationHandler extends BaseCommandHandler<ChangeProductDetailActivation, ProductDetail> {
  constructor(
    loggerCreator: LoggerCreator,
    private readonly productDetailsRepository: productDetailsRepository
  ) {
    super(ProductDetail, loggerCreator)
  }

  protected async handle(params: ChangeProductDetailActivation): Promise<ProductDetail> {
    const auth = params.auth
    const productId = params.productId
    const enabled = params.enabled

    const productDetail = await this.productDetailsRepository.findById(productId)

    if (!productDetail) {
      throw ProductDetailNotFoundException.of(productId)
    }

    if (params.ocurredOn < productDetail.activationOccurredOn) {
      return productDetail
    }

    productDetail.changeActivation(
      auth,
      enabled,
      params.ocurredOn
    )

    await this.productDetailsRepository.save(productDetail)

    return productDetail
  }
}