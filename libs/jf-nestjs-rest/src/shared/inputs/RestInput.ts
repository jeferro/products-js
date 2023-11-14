import * as deepEqual from 'deep-equal'

export abstract class RestInput {
  equals(other: any | undefined | null): boolean {
    if (!other) {
      return false
    }

    return deepEqual(this, other)
  }
}
