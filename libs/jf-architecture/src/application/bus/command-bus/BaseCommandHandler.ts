import { BaseHandler } from '../BaseHandler'
import { Command } from './Command'

export abstract class BaseCommandHandler<
  C extends Command,
  R,
> extends BaseHandler<C, R> {}
