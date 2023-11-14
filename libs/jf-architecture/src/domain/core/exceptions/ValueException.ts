import { AppException } from './AppException'

export class ValueException extends AppException {
  static of(message?: string) {
    return new ValueException(message || '')
  }
}
