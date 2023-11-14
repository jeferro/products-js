import { Aggregate } from '../entities/Aggregator'
import { DomainEvent } from '../events/DomainEvent'

export abstract class Stream<A extends Aggregate<any>> {

  async publishAll(aggregate: A): Promise<void> {
    aggregate.domainEvents
      .forEach(event => this.publishEach(event))
  }

  abstract publishEach(event: DomainEvent): Promise<void>

}
