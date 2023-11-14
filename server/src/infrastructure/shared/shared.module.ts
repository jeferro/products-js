import { DynamicModule, Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ErrorsRestFilter } from './adapters/rest/ErrorsRestFilter'

@Module({})
export class SharedModule {

  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      providers: [
        { provide: APP_FILTER, useClass: ErrorsRestFilter },
      ],
    }
  }
}
