import { Username } from "../../auth/entities/Username"
import { Value } from "../entities/Value";

export abstract class DomainEvent extends Value {

  constructor(
    readonly ocurredBy: Username,
    readonly ocurredOn: Date,
  ) { 
    super()
  }
}
