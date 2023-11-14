import { CollectionValue } from "../entities/CollectionValue";
import { DomainEvent } from "./DomainEvent";

export class DomainEvents extends CollectionValue<DomainEvent> {

    static empty(): DomainEvents {
        return new DomainEvents([])
    }

    record(event:DomainEvent) {
        this.values.push(event)
    }
}