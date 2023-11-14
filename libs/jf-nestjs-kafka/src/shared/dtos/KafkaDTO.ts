import { Type } from 'class-transformer'
import * as deepEqual from 'deep-equal'

export abstract class KafkaDTO {

  @Type(() => Date)
  readonly ocurredOn: Date

  constructor(
    ocurredOn: Date
  ) {
    this.ocurredOn = ocurredOn
   }

  equals(other: any | undefined | null): boolean {
    if (!other) {
      return false
    }

    return deepEqual(this, other)
  }
}
