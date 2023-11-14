import { Logger } from '../logger/Logger'
import { LoggerCreator } from '../logger/LoggerCreator'
import { Params } from './Params'
import { Projection } from '../../domain/core/entities/Projection'
import { Aggregate } from '../../domain/core/entities/Aggregator'
import { ForbiddenException } from '../../domain/core/exceptions/ForbiddenException'
import { Class } from '../../definitions/Class'
import { Abstract } from '../../definitions/Abstract'

export abstract class BaseHandler<P extends Params, R> {
  protected readonly logger: Logger

  constructor(
    aggregatorType: Class<Aggregate<any>>
      | Abstract<Aggregate<any>>
      | Class<Projection<any>>,
    loggerCreator: LoggerCreator) {
    this.logger = loggerCreator.ofObject(aggregatorType.name, this)
  }

  async execute(params: P): Promise<R> {
    const startAt = new Date()

    try {
      const auth = params.auth

      if (!auth.hasPermissions(this.requiredRoles)) {
        throw ForbiddenException.ofEmpty()
      }

      const result = await this.handle(params)

      this.logger.handlerSucess(this, params, result, startAt)

      return result
    } catch (cause) {
      this.logger.handlerFailed(this, params, cause)

      throw cause
    }
  }

  protected abstract handle(params: P): Promise<R>

  protected get requiredRoles(): string[] {
    return []
  }
}
