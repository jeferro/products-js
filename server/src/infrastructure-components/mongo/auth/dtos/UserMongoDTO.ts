import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { FlattenMaps, HydratedDocument } from 'mongoose'
import { MetadataMongoDTO, MongoDTO } from "jf-nestjs-mongo"


@Schema({
  collection: 'users',
  optimisticConcurrency: true,
  versionKey: 'version',
})
export class UserMongoDTO extends MongoDTO {
  @Prop()
  readonly _id: string

  @Prop()
  readonly encryptedPassword: string

  @Prop()
  readonly roles: string[]

  @Prop()
  readonly metadata: MetadataMongoDTO

  constructor(
    _id: string,
    encryptedPassword: string,
    roles: string[],
    metadata: MetadataMongoDTO
  ) {
    super()

    this._id = _id

    this.encryptedPassword = encryptedPassword
    this.roles = roles
    this.metadata = metadata
  }

  get username(): string {
    return this._id
  }

  get isNew(): boolean {
    return this.metadata.isNew
  }

  static ofModel(model: FlattenMaps<UserMongoDTO>): UserMongoDTO {
    const metadata = MetadataMongoDTO.ofModel(model.metadata)

    return new UserMongoDTO(
      model._id,
      model.encryptedPassword,
      model.roles,
      metadata  
    )
  }
}

export type UserMongoDTODocument = HydratedDocument<UserMongoDTO>

export const UserMongoDTOSchema = SchemaFactory.createForClass(UserMongoDTO)
