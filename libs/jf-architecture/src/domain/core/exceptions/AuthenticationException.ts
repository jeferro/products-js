import { AppException } from './AppException'

export class AuthenticationException extends AppException {
  static ofUsernameNotFound() {
    return new AuthenticationException(`Username not found`)
  }

  static ofIncorrectPassword() {
    return new AuthenticationException(`Password incorrect`)
  }
}
