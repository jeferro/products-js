import { BaseHandler } from '../BaseHandler'
import { Query } from './Query'

export abstract class BaseQueryHandler<
  C extends Query,
  R,
> extends BaseHandler<C, R> {}
