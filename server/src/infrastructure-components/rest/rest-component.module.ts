import { DynamicModule, Global, Module } from '@nestjs/common'
import { RestNestjsModule, RestConfiguration } from 'jf-nestjs-rest'

@Global()
@Module({})
export class RestComponentModule {
  
  static forRoot(config: RestConfiguration): DynamicModule {
    return {
      module: RestComponentModule,
      imports: [
        RestNestjsModule.forRoot(config),
      ]
    }
  }
}
