import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { FlattenMaps, HydratedDocument } from 'mongoose'
import { MetadataMongoDTO, MongoDTO } from "jf-nestjs-mongo"
import { ReviewMongoDTO } from './ReviewMongoDTO'


@Schema({
  collection: 'product-details',
  optimisticConcurrency: true,
  versionKey: 'version',
})
export class ProductDetailMongoDTO extends MongoDTO {

  @Prop()
  readonly _id: string

  @Prop()
  readonly title: string

  @Prop()
  readonly description: string

  @Prop()
  readonly enabled: boolean

  @Prop()
  readonly infoOcurredOn: Date

  @Prop()
  readonly activationOcurredOn: Date

  @Prop()
  readonly reviews: ReviewMongoDTO[]

  @Prop()
  readonly metadata: MetadataMongoDTO

  constructor(
    _id: string,
    title: string,
    description: string,
    enabled: boolean,
    infoOcurredOn: Date,
    activationOcurredOn: Date,
    reviews: ReviewMongoDTO[],
    metadata: MetadataMongoDTO
  ) {
    super()
    this._id = _id

    this.title = title
    this.description = description
    this.enabled = enabled

    this.infoOcurredOn = infoOcurredOn
    this.activationOcurredOn = activationOcurredOn

    this.reviews = reviews

    this.metadata = metadata
  }

  get isNew(): boolean {
    return this.metadata.isNew
  }

  static ofModel(model: FlattenMaps<ProductDetailMongoDTO>): ProductDetailMongoDTO {
    const reviews = model.reviews.map(review => ReviewMongoDTO.ofModel(review))

    const metadata = MetadataMongoDTO.ofModel(model.metadata)

    return new ProductDetailMongoDTO(
      model._id,
      model.title,
      model.description,
      model.enabled,
      model.infoOcurredOn,
      model.activationOcurredOn,
      reviews,
      metadata
    )
  }
}

export type ProductDetailMongoDTODocument = HydratedDocument<ProductDetailMongoDTO>

export const ProductDetailMongoDTOSchema = SchemaFactory.createForClass(ProductDetailMongoDTO)
