import { MetadataRestDTO, RestDTO } from 'jf-nestjs-rest'
import { ReviewRestDTO } from './ReviewRestDTO'

export class ProductDetailRestDTO extends RestDTO {
  
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly enabled: boolean,
    readonly reviews: ReviewRestDTO[],
    readonly metadata: MetadataRestDTO
  ) {
    super()
  }
}
