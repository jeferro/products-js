import { FlattenMaps } from 'mongoose'
import { ProductEventMongoDTO } from './ProductEventMongoDTO'

export class ProductDeletedMongoDTO extends ProductEventMongoDTO {

  constructor(
    _id: string,
    ocurredOn: Date,
    ocurredBy: string,
    productId: string,
  ) {
    super(
      _id, 
      ocurredOn,
      ocurredBy,
      productId,
      undefined,
      undefined,
      undefined,
      ProductDeletedMongoDTO.name
    )
  }

  static ofModel(model: FlattenMaps<ProductDeletedMongoDTO>): ProductDeletedMongoDTO {
    return new ProductDeletedMongoDTO(
      model._id,
      model.ocurredOn,
      model.ocurredBy,
      model.productId,
    )
  }
}
