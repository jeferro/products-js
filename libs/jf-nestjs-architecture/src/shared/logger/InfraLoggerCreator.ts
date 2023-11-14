import { Injectable } from '@nestjs/common'
import { InfrastructureLogger } from './InfraLogger'
import { InfrastructureConfiguration } from '../InfrastructureConfiguration'
import { LoggerCreator, Logger } from 'jf-architecture'

@Injectable()
export class InfrastructureLoggerCreator extends LoggerCreator {

  constructor(
    private readonly infrastructureConfig: InfrastructureConfiguration
  ) {
    super()
  }

  ofObject(
    prefix: string,
    object: object
  ): Logger {
    return new InfrastructureLogger(
      prefix,
      object,
      this.infrastructureConfig.logQueries
    )
  }
}
