import { FlattenMaps } from 'mongoose'
import { ProductEventMongoDTO } from './ProductEventMongoDTO'


export class ProductCreatedMongoDTO extends ProductEventMongoDTO {

  constructor(
    _id: string,
    ocurredOn: Date,
    ocurredBy: string,
    productId: string,
    title: string,
    description: string,
    enabled: boolean
  ) {
    super(
      _id,
      ocurredOn,
      ocurredBy,
      productId,
      title,
      description,
      enabled,
      ProductCreatedMongoDTO.name
    )
  }

  static ofModel(model: FlattenMaps<ProductCreatedMongoDTO>): ProductCreatedMongoDTO {
    if (!model.title
      || !model.description
      || model.enabled === undefined) {
      throw new Error('Mandatory data is undefined')
    }

    return new ProductCreatedMongoDTO(
      model._id,
      model.ocurredOn,
      model.ocurredBy,
      model.productId,
      model.title,
      model.description,
      model.enabled
    )
  }
}
