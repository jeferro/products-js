import * as deepEqual from 'deep-equal'

export abstract class Value {
  
  equals(other: any | undefined | null): boolean {
    if (!other) {
      return false
    }

    return deepEqual(this, other)
  }

  get privateAttributeNames(): string[] {
    return []
  }

  toString(): string {
    return JSON.stringify(this)
  }
}
