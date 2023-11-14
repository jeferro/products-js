import {
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { SignInRestInput } from './inputs/SignInUserRestInput'
import { RestAuthService, AuthRestDTO, RestController } from 'jf-nestjs-rest'

@Controller()
export abstract class AuthRestControllerSpec extends RestController {

  constructor(
    private readonly restAuthService: RestAuthService,
  ) {
    super()
  }

  @Post('/authentications')
  async signIn(
    @Req() request: Request,
    @Body() input: SignInRestInput,
    @Res() response: Response
  ): Promise<Response> {
    const currentAuthDTO = await this.restAuthService.getAuthDTO(request)

    const newAuthDTO = await this.onSignIn(currentAuthDTO, input)

    await this.restAuthService.setAuthDTO(response, newAuthDTO)

    return response.json(newAuthDTO)
  }

  abstract onSignIn(
    authDTO: AuthRestDTO | undefined,
    input: SignInRestInput
  ): Promise<AuthRestDTO>
}
