import { UserMongoDTO } from 'src/infrastructure-components/mongo/auth/dtos/UserMongoDTO'
import { User } from 'src/domain/auth/entities/User'
import { BidireccionalMapper } from 'jf-architecture'
import { UsernameMongoMapper } from '../../../../shared/adapters/mongo/mappers/UsernameMongoMapper'
import { MetadataMongoMapper } from 'src/infrastructure/shared/adapters/mongo/mappers/MetadataMongoMapper'

export class UserMongoMapper extends BidireccionalMapper<User, UserMongoDTO> {

  private readonly usernameMongoMapper = new UsernameMongoMapper()

  private readonly metadataMongoMapper = new MetadataMongoMapper()

  protected _toEntity(dto: UserMongoDTO): User {
    return new User(
      this.usernameMongoMapper.toEntity(dto.username),
      dto.encryptedPassword,
      dto.roles,
      this.metadataMongoMapper.toEntity(dto.metadata)
    )
  }

  protected _toDTO(entity: User): UserMongoDTO {
    return new UserMongoDTO(
      this.usernameMongoMapper.toDTO(entity.username),
      entity.encryptedPassword,
      entity.roles,
      this.metadataMongoMapper.toDTO(entity.metadata)
    )
  }
}
