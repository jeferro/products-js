import { Username, BidireccionalMapper } from 'jf-architecture'

export class UsernameMongoMapper extends BidireccionalMapper<Username, string> {
  
  protected _toEntity(dto: string): Username {
    return new Username(dto)
  }

  protected _toDTO(entity: Username): string {
    return entity.value
  }
}
