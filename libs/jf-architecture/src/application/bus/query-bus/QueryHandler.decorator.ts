
import { Class } from '../../../definitions/Class'
import { Query } from './Query'

export const QUERY_HANDLER_METADATA_KEY = '__query_handler__'

export function QueryHandler(queryClass: Class<Query>): ClassDecorator {
  return (handler: any) => {
    Reflect.defineMetadata(
      QUERY_HANDLER_METADATA_KEY,
      queryClass.prototype.constructor.name,
      handler,
    )
  }
}
