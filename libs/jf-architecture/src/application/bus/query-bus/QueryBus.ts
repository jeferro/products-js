import { Query } from './Query'
import { BaseQueryHandler } from './BaseQueryHandler'
import { QUERY_HANDLER_METADATA_KEY } from './QueryHandler.decorator'
import { Bus } from '../Bus'

export class QueryBus extends Bus<
  Query,
  any,
  BaseQueryHandler<Query, any>
> {
  protected getIdFromParams(query: Query): string {
    const prototype = Object.getPrototypeOf(query)

    return prototype.constructor.name
  }

  protected getIdFromHandler(
    handler: BaseQueryHandler<any, any>,
  ): string | undefined {
    try {
      const { constructor: queryType } = Object.getPrototypeOf(handler)

      return Reflect.getMetadata(QUERY_HANDLER_METADATA_KEY, queryType)
    } catch (cause) {
      return undefined
    }
  }
}
