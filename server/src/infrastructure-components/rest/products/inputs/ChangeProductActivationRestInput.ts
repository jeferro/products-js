import { IsBoolean, IsNotEmpty } from 'class-validator'
import { RestInput } from 'jf-nestjs-rest'

export class ChangeProductActivationRestInput extends RestInput {
  @IsNotEmpty()
  @IsBoolean()
  readonly enable: boolean

  constructor(enable: boolean) {
    super()

    this.enable = enable
  }
}
