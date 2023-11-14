import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { FlattenMaps, HydratedDocument } from 'mongoose'
import { MetadataMongoDTO, MongoDTO } from "jf-nestjs-mongo"


@Schema({
  collection: 'products',
  optimisticConcurrency: true,
  versionKey: 'version',
})
export class ProductMongoDTO extends MongoDTO {
  @Prop()
  readonly _id: string

  @Prop()
  readonly title: string

  @Prop()
  readonly description: string

  @Prop()
  readonly enabled: boolean

  @Prop()
  readonly metadata: MetadataMongoDTO

  constructor(
    _id: string,
    title: string,
    description: string,
    enabled: boolean,
    metadata: MetadataMongoDTO
  ) {
    super()
    this._id = _id
    this.title = title
    this.description = description
    this.enabled = enabled
    this.metadata = metadata
  }

  get isNew(): boolean {
    return this.metadata.isNew
  }

  static ofModel(model: FlattenMaps<ProductMongoDTO>): ProductMongoDTO {
    const metadata = MetadataMongoDTO.ofModel(model.metadata)

    return new ProductMongoDTO(
      model._id,
      model.title,
      model.description,
      model.enabled,
      metadata
    )
  }
}

export type ProductMongoDTODocument = HydratedDocument<ProductMongoDTO>

export const ProductMongoDTOSchema = SchemaFactory.createForClass(ProductMongoDTO)
