import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ProductDetailMongoDTO } from './dtos/ProductDetailMongoDTO'

@Injectable()
export class ProductDetailsMongoClient {

  constructor(
    @InjectModel(ProductDetailMongoDTO.name) 
    private readonly productDetailsDao: Model<ProductDetailMongoDTO>
  ) { }

  async save(productDetailDTO: ProductDetailMongoDTO): Promise<void> {
    if (productDetailDTO.isNew) {
      const model = await this.productDetailsDao.create(productDetailDTO)
      await model.save()
      return
    }

    await this.productDetailsDao.updateOne({ _id: productDetailDTO._id }, productDetailDTO).exec()
  }

  async findById(producDetailIdDTO: string): Promise<ProductDetailMongoDTO | undefined> {
    const model = await this.productDetailsDao.findOne({ _id: producDetailIdDTO, }).exec()

    return model
      ? ProductDetailMongoDTO.ofModel(model)
      : undefined
  }

  async deleteById(productDetailIdDTO: string): Promise<void> {
    await this.productDetailsDao.deleteOne({ _id: productDetailIdDTO }).exec()
  }
}
