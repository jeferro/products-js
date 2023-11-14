import { BaseHandler } from '../bus/BaseHandler'
import { Params } from '../bus/Params'

export interface Logger {
  handlerSucess<P extends Params, R>(
    handler: BaseHandler<P, R>,
    params: P,
    result: R,
    startAt: Date,
  ): void

  handlerFailed<P extends Params, R>(
    handler: BaseHandler<P, R>,
    params: P,
    cause: Error,
  ): void

  debug(message: string): void

  info(message: string): void

  warn(message: string): void

  error(message: string): void
}
