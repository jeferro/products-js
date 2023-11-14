import { Username, BidireccionalMapper } from 'jf-architecture'

export class UsernameRestMapper extends BidireccionalMapper<Username, string> {

  protected _toDTO(entity: Username): string {
    return entity.value
  }

  protected _toEntity(dto: string): Username {
    return new Username(dto)
  }
}
