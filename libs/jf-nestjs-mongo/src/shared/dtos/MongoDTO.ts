import * as deepEqual from 'deep-equal'

export abstract class MongoDTO {
  
  protected static readonly SEPARATOR = ':'

  equals(other: any | undefined | null): boolean {
    if (!other) {
      return false
    }

    return deepEqual(this, other)
  }
}
