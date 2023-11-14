import { Identifier } from './Identifier'
import { Value } from './Value'

export class Entity<I extends Identifier> extends Value {
  constructor(
    readonly id: I,
  ) {
    super()
  }

  hasSameId(other: Entity<I>): boolean {
    return this.id.equals(other.id)
  }
}
