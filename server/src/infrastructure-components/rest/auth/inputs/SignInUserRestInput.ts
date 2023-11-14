import { IsNotEmpty } from 'class-validator'
import { RestDTO } from 'jf-nestjs-rest'

export class SignInRestInput extends RestDTO {
  @IsNotEmpty()
  public readonly username: string

  @IsNotEmpty()
  public readonly password: string

  constructor(
    username: string,
    password: string
  ) {
    super()

    this.username = username
    this.password = password
  }
}
