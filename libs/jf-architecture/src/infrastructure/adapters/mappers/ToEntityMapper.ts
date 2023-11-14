import { MapperException } from "./MapperException"

export abstract class ToEntityMapper<E, D> {
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
}
