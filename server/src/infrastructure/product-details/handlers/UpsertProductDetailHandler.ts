import { BaseCommandHandler, CommandHandler, LoggerCreator, ValueException } from 'jf-architecture'
import { UpsertProductDetail } from './commands/UpsertProductDetail'
import { ProductDetail } from '../projections/ProductDetail'
import { ProductDetailsRepository as productDetailsRepository } from '../repositories/ProductDetailsRepository'


@CommandHandler(UpsertProductDetail)
export class UpsertProductDetailHandler extends BaseCommandHandler<UpsertProductDetail, ProductDetail> {
  constructor(
    loggerCreator: LoggerCreator,
    private readonly productDetailsRepository: productDetailsRepository
  ) {
    super(ProductDetail, loggerCreator)
  }

  protected async handle(params: UpsertProductDetail): Promise<ProductDetail> {
    const productDetail = await this.productDetailsRepository.findById(params.productId)

    return productDetail
      ? this.updateProductDetail(
        productDetail,
        params
      )
      : this.createProductDetail(
        params
      )
  }

  private async createProductDetail(
    params: UpsertProductDetail
  ): Promise<ProductDetail> {
    if (params.enabled === undefined) {
      throw ValueException.of('Enabled is mandatory')
    }

    const productDetail = ProductDetail.new(
      params.auth,
      params.productId,
      params.title,
      params.description,
      params.enabled,
      params.ocurredOn
    )

    await this.productDetailsRepository.save(productDetail)

    return productDetail
  }

  private async updateProductDetail(
    productDetail: ProductDetail,
    params: UpsertProductDetail
  ): Promise<ProductDetail> {
    if (params.ocurredOn < productDetail.infoOccurredOn) {
      return productDetail
    }

    productDetail.updateInfo(
      params.auth,
      params.title,
      params.description,
      params.ocurredOn
    )

    await this.productDetailsRepository.save(productDetail)

    return productDetail
  }
}
