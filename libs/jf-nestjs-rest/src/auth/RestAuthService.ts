import { Request, Response } from 'express'
import { AuthRestDTO } from './dtos/AuthRestDTO'

export abstract class RestAuthService {

  abstract setAuthDTO(response: Response, authDTO: AuthRestDTO): Promise<void>

  abstract getAuthDTO(request: Request): Promise<AuthRestDTO | undefined>
}
