import { INestApplication, Type } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from 'supertest'
import { RestConfiguration, RestController, AuthRestDTO, JwtRestAuthService, RestAuthService } from "jf-nestjs-rest"
import { RestComponentModule } from "src/infrastructure-components/rest/rest-component.module"


export class RestControllerTestBootstraper {

  private app: INestApplication<any> | undefined

  private authorizationHeader: string = ''

  async start(
    controllerType: Type<RestController>,
    authRestDTO?: AuthRestDTO | undefined
  ): Promise<any> {
    const restConfiguration = new RestConfiguration(
      'password',
      '7d'
    )

    const moduleRef = await Test.createTestingModule({
      imports: [
        RestComponentModule.forRoot(restConfiguration)
      ],
      controllers: [
        controllerType
      ]
    })
      .compile()

    this.app = await moduleRef.createNestApplication()
      .init()

    if (authRestDTO) {
      const jwtRestAuthService = this.app.get(RestAuthService) as JwtRestAuthService

      const accessToken = await jwtRestAuthService.generateAccessToken(authRestDTO)

      this.authorizationHeader = `Bearer ${accessToken}`
    }

    return this.app.get(controllerType)
  }

  async stop() {
    await this.app?.close()
  }

  post(url: string): request.Test {
    if (!this.app) {
      throw new Error('App should be started')
    }

    return request(this.app.getHttpServer())
      .post(url)
      .set('Authorization', this.authorizationHeader)
  }

  get(url: string): request.Test {
    if (!this.app) {
      throw new Error('App should be started')
    }

    return request(this.app.getHttpServer())
      .get(url)
      .set('Authorization', this.authorizationHeader)
  }

  put(url: string): request.Test {
    if (!this.app) {
      throw new Error('App should be started')
    }

    return request(this.app.getHttpServer())
      .put(url)
      .set('Authorization', this.authorizationHeader)
  }

  delete(url: string): request.Test {
    if (!this.app) {
      throw new Error('App should be started')
    }

    return request(this.app.getHttpServer())
      .delete(url)
      .set('Authorization', this.authorizationHeader)
  }

}