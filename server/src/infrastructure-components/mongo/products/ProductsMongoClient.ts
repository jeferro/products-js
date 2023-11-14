import { Injectable } from '@nestjs/common'
import { ProductMongoDTO } from './dtos/products/ProductMongoDTO'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ProductsMongoClient {

  constructor(
    @InjectModel(ProductMongoDTO.name)
    private readonly productsDao: Model<ProductMongoDTO>
  ) { }

  async save(productDTO: ProductMongoDTO): Promise<void> {
    if (productDTO.isNew) {
      const model = await this.productsDao.create(productDTO)
      await model.save()
      return
    }

    await this.productsDao.updateOne({ _id: productDTO._id }, productDTO).exec()
  }

  async findById(producIdDTO: string): Promise<ProductMongoDTO | undefined> {
    const model = await this.productsDao.findOne({ _id: producIdDTO, }).exec()

    return model
      ? ProductMongoDTO.ofModel(model)
      : undefined
  }

  async deleteById(productIdDTO: string): Promise<void> {
    await this.productsDao.deleteOne({ _id: productIdDTO }).exec()
  }

  async findAll(): Promise<ProductMongoDTO[]> {
    const models = await this.productsDao.find({}).exec()

    return models.map(model => ProductMongoDTO.ofModel(model))
  }
}
