import { Aggregate } from '../entities/Aggregator'
import { Projection } from '../entities/Projection';

export abstract class Repository<A extends Aggregate<any> | Projection<any>> {}
