import { MetadataMongoDTOMother } from 'jf-nestjs-mongo'
import { MetadataMongoMapper } from './MetadataMongoMapper'
import { MetadataMother } from 'jf-architecture'

describe(`${MetadataMongoMapper.name}`, () => {
  let metadataMongoMapper = new MetadataMongoMapper()

  it('should map to dto', () => {
    const metadata = MetadataMother.one()

    const metadataDTO = metadataMongoMapper.toDTO(metadata)
    const result = metadataMongoMapper.toEntity(metadataDTO)

    expect(result).toStrictEqual(metadata)
  })

  it('should map to entity', () => {
    const metadataDTO = MetadataMongoDTOMother.one()

    const metadata = metadataMongoMapper.toEntity(metadataDTO)
    const result = metadataMongoMapper.toDTO(metadata)

    expect(result).toStrictEqual(metadataDTO)
  })
})
