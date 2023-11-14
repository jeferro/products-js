import { Auth } from '../../auth/entities/Auth'
import { Username } from '../../auth/entities/Username'
import { Entity } from './Entity'
import { Identifier } from './Identifier'
import { Metadata } from './Metadata'

export abstract class Projection<I extends Identifier> extends Entity<I> {

  constructor(
    id: I,
    readonly metadata: Metadata
  ) {
    super(id)
  }

  get createdBy(): Username {
    return this.metadata.createdBy
  }

  get createdAt(): Date {
    return this.metadata.createdAt
  }

  get updatedBy(): Username {
    return this.metadata.updatedBy
  }

  get updatedAt(): Date {
    return this.metadata.updatedAt
  }

  protected markAsModifiedBy(auth: Auth){
    this.metadata.markAsModifiedBy(auth)
  }
}
