import { FlattenMaps } from 'mongoose'
import { ProductEventMongoDTO } from './ProductEventMongoDTO'


export class ProductUpdatedMongoDTO extends ProductEventMongoDTO {

  constructor(
    _id: string,
    ocurredOn: Date,
    ocurredBy: string,
    productId: string,
    title: string,
    description: string
  ) {
    super(
      _id, 
      ocurredOn,
      ocurredBy,
      productId,
      title,
      description,
      undefined,
      ProductUpdatedMongoDTO.name
    )
  }

  static ofModel(model: FlattenMaps<ProductUpdatedMongoDTO>): ProductUpdatedMongoDTO {
    if (!model.title
      || !model.description) {
      throw new Error('Mandatory data is undefined')
    }

    return new ProductUpdatedMongoDTO(
      model._id,
      model.ocurredOn,
      model.ocurredBy,
      model.productId,
      model.title,
      model.description
    )
  }
}
