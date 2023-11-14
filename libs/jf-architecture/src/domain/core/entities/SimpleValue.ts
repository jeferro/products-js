import { Value } from './Value'
import { ValueException } from '../exceptions/ValueException'

export abstract class SimpleValue<V> extends Value {
  constructor(readonly value: V) {
    super()

    if (value == '') {
      throw ValueException.of('Value can not be empty')
    }

    if (value instanceof String
      && value.includes(' ')) {
      throw ValueException.of('Id can\'t have spaces')
    }
  }
}
