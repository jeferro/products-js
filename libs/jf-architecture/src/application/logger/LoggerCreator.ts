import { Logger } from './Logger'

export abstract class LoggerCreator {
  abstract ofObject(preffix: string, object: object): Logger
}
