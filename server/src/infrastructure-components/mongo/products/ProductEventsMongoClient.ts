import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FlattenMaps, Model } from 'mongoose'
import { ProductEventMongoDTO } from './dtos/events/ProductEventMongoDTO'
import { ProductCreatedMongoDTO } from './dtos/events/ProductCreatedMongoDTO'
import { ProductUpdatedMongoDTO } from './dtos/events/ProductUpdatedMongoDTO'
import { ProductDeletedMongoDTO } from './dtos/events/ProductDeletedMongoDTO'
import { ProductActivationChangedMongoDTO } from './dtos/events/ProductActivationChangedMongoDTO'

@Injectable()
export class ProductEventsMongoClient {

  constructor(
    @InjectModel(ProductEventMongoDTO.name)
    private readonly eventsDao: Model<ProductEventMongoDTO>
  ) { }

  async save(event: ProductEventMongoDTO): Promise<void> {
    const model = await this.eventsDao.create(event)
    await model.save()
  }

  async findById(eventId: string): Promise<ProductEventMongoDTO | undefined> {
    const model = await this.eventsDao.findOne({ _id: eventId, }).exec()

    return model
      ? this.mapFromModel(model)
      : undefined
  }

  private mapFromModel(model: FlattenMaps<any>): ProductEventMongoDTO {
    switch (model.type) {
      case ProductCreatedMongoDTO.name:
        return ProductCreatedMongoDTO.ofModel(model)

      case ProductUpdatedMongoDTO.name:
        return ProductUpdatedMongoDTO.ofModel(model)

      case ProductActivationChangedMongoDTO.name:
        return ProductActivationChangedMongoDTO.ofModel(model)

      case ProductDeletedMongoDTO.name:
        return ProductDeletedMongoDTO.ofModel(model)

      default:
        throw new Error('Unknown type')
    }
  }


}
