import { CollectionValue } from './CollectionValue'
import { Entity } from './Entity'
import { Identifier } from './Identifier'

export class CollectionEntity<
  T extends Entity<I>,
  I extends Identifier,
> extends CollectionValue<T> {
  getIds(): I[] {
    return this.map((entity) => entity.id)
  }

  getById(id: I): T | undefined {
    const result = this.find((entity) => entity.id.equals(id))

    return result ? result : undefined
  }

  includesId(id: I): boolean {
    return this.getById(id) ? true : false
  }
}
