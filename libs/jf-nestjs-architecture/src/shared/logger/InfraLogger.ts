import { Logger as NestLogger } from '@nestjs/common'
import { LoggerJsonConverter } from './converters/LoggerJsonConverter'
import { Logger, Params, BaseQueryHandler, BaseHandler } from 'jf-architecture'

export class InfrastructureLogger implements Logger {
  private readonly logger: NestLogger

  constructor(
    readonly prefix: string,
    object: object,
    readonly logQueries: boolean) {
    this.logger = new NestLogger(object.constructor.name)
  }

  handlerSucess<P extends Params, R>(
    handler: BaseHandler<P, R>,
    params: P,
    result: R,
    startAt: Date,
  ): void {
    if (handler instanceof BaseQueryHandler
      && !this.logQueries) {
      return
    }

    const message =
      `[${this.prefix}] \n` +
      `  duration: \n` +
      `    ${this.calculateDuration(startAt)} \n` +
      `  command: \n` +
      `    ${LoggerJsonConverter.convert(params)} \n` +
      `  result: \n` +
      `    ${LoggerJsonConverter.convert(result)}\n`

    this.logger.log(message)
  }

  handlerFailed<P extends Params, R>(
    handler: BaseHandler<P, R>,
    params: P,
    cause: Error,
  ): void {
    const message =
      `[${this.prefix}] \n` +
      `  ${handler instanceof BaseQueryHandler ? 'query' : 'command'}: \n` +
      `    ${LoggerJsonConverter.convert(params)} \n` +
      `  ${cause.stack || '--'}\n`

    this.logger.error(message)
  }

  debug(message: string): void {
    this.logger.debug(`[${this.prefix}] ${message}`)
  }

  info(message: string): void {
    this.logger.log(`[${this.prefix}] ${message}`)
  }

  warn(message: string): void {
    this.logger.warn(`[${this.prefix}] ${message}`)
  }

  error(message: string): void {
    this.logger.error(message)
  }

  private calculateDuration(startAt: Date): string {
    const now = new Date()

    const durationInMillis = now.getTime() - startAt.getTime()

    if (durationInMillis < 1000) {
      return `${durationInMillis}ms`
    }

    const seconds = Math.trunc(durationInMillis / 1000)
    const milliseconds = durationInMillis % 1000

    return `${seconds}s ${milliseconds}ms`
  }
}
