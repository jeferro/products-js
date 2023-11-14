import { FlattenMaps } from 'mongoose'
import { ProductEventMongoDTO } from './ProductEventMongoDTO'

export class ProductActivationChangedMongoDTO extends ProductEventMongoDTO {

  constructor(
    _id: string,
    ocurredOn: Date,
    ocurredBy: string,
    productId: string,
    enabled: boolean
  ) {
    super(
      _id,
      ocurredOn,
      ocurredBy,
      productId,
      undefined,
      undefined,
      enabled,
      ProductActivationChangedMongoDTO.name
    )
  }

  static ofModel(
    model: FlattenMaps<ProductActivationChangedMongoDTO>
  ): ProductActivationChangedMongoDTO {
    return new ProductActivationChangedMongoDTO(
      model._id,
      model.ocurredOn,
      model.ocurredBy,
      model.productId,
      model.enabled
    )
  }
}
