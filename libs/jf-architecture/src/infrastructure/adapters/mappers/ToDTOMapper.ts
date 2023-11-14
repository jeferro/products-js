import { MapperException } from "./MapperException"

export abstract class ToDTOMapper<E, D> {
  
  toDtoOrUndefined(entity: E | undefined): D | undefined {
    if (!entity) {
      return undefined
    }

    return this.toDTO(entity)
  }

  toDTO(entity: E): D {
    try{
      return this._toDTO(entity)
    }
    catch(cause){
      throw new MapperException(cause)
    }
  }

  protected abstract _toDTO(entity: E): D

  toDtoList(entities: E[]): D[] {
    return entities.map((dto) => this.toDTO(dto))
  }

  toDtoSet(entities: Set<E>): Set<D> {
    const dtos = new Set<D>()

    for (const dto of entities) {
      dtos.add(this.toDTO(dto))
    }

    return dtos
  }
}
