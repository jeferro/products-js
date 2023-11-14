import { DynamicModule, Module } from '@nestjs/common'
import { SignInHandler } from 'src/application/auth/SignInHandler'
import { UsersRepository } from 'src/domain/auth/repository/UsersRepository'
import { UsersMongoRepository } from './adapters/mongo/UsersMongoRepository'
import { AuthRestController } from './adapters/rest/AuthRestController'
import { AuthConfiguration } from './AuthConfiguration'


@Module({})
export class AuthModule {

  static forRoot(config: AuthConfiguration): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        {provide: AuthConfiguration, useValue: config},

        { provide: UsersRepository, useClass: UsersMongoRepository },

        SignInHandler
      ],
      controllers: [
        AuthRestController
      ]
    }
  }
}
