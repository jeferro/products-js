import { MetadataRestDTO, RestDTO } from 'jf-nestjs-rest'

export class ProductRestDTO extends RestDTO {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly enabled: boolean,
    readonly metadata: MetadataRestDTO
  ) {
    super()
  }
}
