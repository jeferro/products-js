import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { MongoDTO } from "jf-nestjs-mongo"

@Schema({
  collection: 'product-events',
  optimisticConcurrency: false
})
export class ProductEventMongoDTO extends MongoDTO {
  @Prop()
  readonly _id: string

  @Prop()
  readonly ocurredOn: Date

  @Prop()
  readonly ocurredBy: string

  @Prop()
  readonly productId: string

  @Prop()
  readonly title: string

  @Prop()
  readonly description: string

  @Prop()
  readonly enabled: boolean

  @Prop()
  readonly type: string

  constructor(
    _id: string,
    ocurredOn: Date,
    ocurredBy: string,
    productId: string,
    title: string | undefined,
    description: string | undefined,
    enabled: boolean | undefined,
    type: string
  ) {
    super()

    this._id = _id
    this.title = title || ''
    this.description = description || ''
    this.enabled = enabled || false
    this.ocurredOn = ocurredOn
    this.ocurredBy = ocurredBy
    this.productId = productId
    this.type = type
  }
}

export type ProductEventMongoDTODocument = HydratedDocument<ProductEventMongoDTO>

export const ProductEventMongoDTOSchema = SchemaFactory.createForClass(ProductEventMongoDTO)
