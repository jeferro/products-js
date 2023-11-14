import { MapperException } from "./MapperException"

export abstract class BidireccionalMapper<E, D> {
  toEntityOrUndefined(dto: D | undefined): E | undefined {
    if (!dto) {
      return undefined
    }

    return this.toEntity(dto)
  }

  toEntity(dto: D): E {
    try{
      return this._toEntity(dto)
    }
    catch(cause){
      throw new MapperException(cause)
    }
  }

  protected abstract _toEntity(dto: D): E

  toEntityList(dtos: D[]): E[] {
    return dtos.map((dto) => this.toEntity(dto))
  }

  toEntitySet(dtos: Set<D>): Set<E> {
    const entities = new Set<E>()

    for (const dto of dtos) {
      entities.add(this.toEntity(dto))
    }

    return entities
  }

  toDTOOrUndefined(entity: E | undefined): D | undefined {
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
