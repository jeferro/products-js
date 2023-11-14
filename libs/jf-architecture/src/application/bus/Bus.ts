import { Params } from './Params'
import { BaseHandler } from './BaseHandler'

export abstract class Bus<P extends Params, R, H extends BaseHandler<P, R>> {

  private handlers = new Map<string, H>()

  async execute<R>(params: P): Promise<R> {
    const handlerId = this.getIdFromParams(params)

    const handler = this.handlers.get(handlerId)

    if (!handler) {
      throw new Error(`Handler by ${handlerId} not found`)
    }

    return handler.execute(params) as R
  }

  registerIfHandler(possibleHandler: any) {
    const handlerId = this.getIdFromHandler(possibleHandler)

    if (!handlerId) {
      return
    }

    this.handlers.set(handlerId, possibleHandler)
  }

  protected abstract getIdFromParams(params: P): string

  protected abstract getIdFromHandler(handler: H): string | undefined
}
