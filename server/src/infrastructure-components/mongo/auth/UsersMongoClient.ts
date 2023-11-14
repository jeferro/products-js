import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserMongoDTO } from './dtos/UserMongoDTO'

@Injectable()
export class UsersMongoClient {

  constructor(
    @InjectModel(UserMongoDTO.name) 
    private readonly usersDao: Model<UserMongoDTO>
  ) { }

  async findByUsername(username: string): Promise<UserMongoDTO | undefined> {
    const model = await this.usersDao.findOne({ _id: username, }).exec()

    return model
      ? UserMongoDTO.ofModel(model)
      : undefined
  }
}
