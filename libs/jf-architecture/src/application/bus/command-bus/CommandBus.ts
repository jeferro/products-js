import { Command } from './Command'
import { BaseCommandHandler } from './BaseCommandHandler'
import { COMMAND_HANDLER_METADATA_KEY } from './CommandHandler.decorator'
import { Bus } from '../Bus'

export class CommandBus extends Bus<
  Command,
  any,
  BaseCommandHandler<Command, any>
> {
  protected getIdFromParams(command: Command): string {
    const prototype = Object.getPrototypeOf(command)

    return prototype.constructor.name
  }

  protected getIdFromHandler(
    handler: BaseCommandHandler<Command, any>,
  ): string | undefined {
    try {
      const { constructor: commandType } = Object.getPrototypeOf(handler)

      return Reflect.getMetadata(COMMAND_HANDLER_METADATA_KEY, commandType)
    } catch (cause) {
      return undefined
    }
  }
}
