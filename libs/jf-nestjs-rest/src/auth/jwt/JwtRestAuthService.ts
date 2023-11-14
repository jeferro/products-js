import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { AuthRestDTO } from '../dtos/AuthRestDTO'
import { RestAuthService } from '../RestAuthService'

@Injectable()
export class JwtRestAuthService extends RestAuthService {

  constructor(
    private readonly jwtService: JwtService
  ) {
    super()
   }

  async setAuthDTO(response: Response, authDTO: AuthRestDTO) {
    const accessToken = await this.generateAccessToken(authDTO)

    response.header('access-token', accessToken)
  }

  async generateAccessToken(authDTO: AuthRestDTO): Promise<string> {
    const payload = {
      sub: authDTO.username,
      roles: authDTO.roles
    }

    return await this.jwtService.signAsync(payload)
  }

  async getAuthDTO(request: Request): Promise<AuthRestDTO | undefined> {
    try {
      const token = this.extractTokenFromHeader(request)

      if (!token) {
        return undefined
      }

      const payload = await this.jwtService.verifyAsync(token)

      return new AuthRestDTO(
        payload.sub,
        payload.roles
      )
    }
    catch (cause) {
      throw new UnauthorizedException()
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    
    return type === 'Bearer' ? token : undefined
  }
}
