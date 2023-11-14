import { MetadataRestMapper } from './MetadataRestMapper'
import { MetadataMother } from 'jf-architecture'

describe(`${MetadataRestMapper.name}`, () => {
  let metadataRestMapper = new MetadataRestMapper()

  it('should map to dto', () => {
    const metadata = MetadataMother.one()

    const result = metadataRestMapper.toDTO(metadata)

    expect(result.createdBy).toEqual(metadata.createdBy.value)
    expect(result.createdAt).toEqual(metadata.createdAt)
    expect(result.updatedBy).toEqual(metadata.updatedBy.value)
    expect(result.updatedAt).toEqual(metadata.updatedAt)
  })
})
