import { ProductEventKafkaDTO } from 'src/infrastructure-components/kafka/products/dtos/ProductEventKafkaDTO'
import { Command, Auth } from 'jf-architecture'


export class SaveProductEvent extends Command {
    
  constructor(
    auth: Auth,
    readonly event: ProductEventKafkaDTO
  ) {
    super(auth)
  }
}