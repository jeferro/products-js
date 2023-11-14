import { Value } from './Value'

export class CollectionValue<T extends Value> extends Value {
  constructor(readonly values: T[]) {
    super()
  }

  get length(): number {
    return this.values.length
  }

  get isEmpty(): boolean {
    return this.length === 0
  }

  get(position: number) : T {
    return this.values[position]
  }

  includes(value: T): boolean {
    return this.values.includes(value)
  }

  find(predicate: (value: T, index: number, obj: T[]) => unknown): T | undefined {
    return this.values.find(predicate)
  }

  filter(predicate: (value: T, index: number, array: T[]) => unknown): T[] {
    return this.values.filter(predicate)
  }

  map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[] {
    return this.values.map(callbackfn)
  }

  forEach(callbackfn: (value: T, index: number, array: T[]) => void) {
    this.values.forEach(callbackfn)
  }
}
