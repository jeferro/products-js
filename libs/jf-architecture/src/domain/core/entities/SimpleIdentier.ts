import { Identifier } from './Identifier'
import { ValueException } from '../exceptions/ValueException'

export class SimpleIdentifier<V> extends Identifier {
  constructor(readonly value: V) {
    super()

    if (value == '') {
      throw ValueException.of('Id value can not be empty')
    }

    if (value instanceof String
      && value.includes(' ')) {
      throw ValueException.of('Id can\'t have spaces')
    }
  }

  toString(): string {
    return JSON.stringify(this)
  }
}
