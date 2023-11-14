import { RestDTO } from "../../shared/dtos/RestDTO"


export class ErrorRestDTO extends RestDTO {
  constructor(readonly cause: string) {
    super()
  }
}
