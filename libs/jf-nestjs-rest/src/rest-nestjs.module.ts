import { DynamicModule, Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { RestAuthService } from './auth/RestAuthService'
import { JwtRestAuthService } from './auth/jwt/JwtRestAuthService'
import { RestConfiguration } from './RestConfiguration'

@Global()
@Module({})
export class RestNestjsModule {

    static forRoot(config: RestConfiguration): DynamicModule {
        return {
            module: RestNestjsModule,
            imports: [
                JwtModule.register({
                    global: false,
                    secret: config.secret,
                    signOptions: {
                        expiresIn: config.expiresIn
                    },
                })
            ],
            providers: [
                { provide: RestAuthService, useClass: JwtRestAuthService },
            ],
            exports: [
                RestAuthService
            ]
        }
    }
}