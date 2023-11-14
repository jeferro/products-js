import { AppException } from './AppException'

export class ForbiddenException extends AppException {
  static ofEmpty(): ForbiddenException {
    return new ForbiddenException(`Forbidden operation`)
  }

  static ofAnonymousAuth(): ForbiddenException {
    return new ForbiddenException(`Authentication is required`)
  }
}
