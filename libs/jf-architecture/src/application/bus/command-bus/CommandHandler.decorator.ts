import { Class } from '../../../definitions/Class'
import { Command } from './Command'

export const COMMAND_HANDLER_METADATA_KEY = '__command_handler__'

export function CommandHandler(
  commandClass: Class<Command>,
): ClassDecorator {
  return (handler: any) => {
    Reflect.defineMetadata(
      COMMAND_HANDLER_METADATA_KEY,
      commandClass.prototype.constructor.name,
      handler,
    )
  }
}
