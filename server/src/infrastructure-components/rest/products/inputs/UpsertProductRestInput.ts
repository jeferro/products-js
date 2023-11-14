import { IsNotEmpty } from 'class-validator'
import { RestInput } from 'jf-nestjs-rest'

export class UpsertProductRestInput extends RestInput {
  @IsNotEmpty()
  readonly title: string

  @IsNotEmpty()
  readonly description: string

  constructor(title: string, description: string) {
    super()
    
    this.title = title
    this.description = description
  }
}
