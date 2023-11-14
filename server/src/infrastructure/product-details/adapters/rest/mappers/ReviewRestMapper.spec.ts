import { ReviewRestDTO } from 'src/infrastructure-components/rest/product-details/dtos/ReviewRestDTO'
import { ReviewRestMapper } from './ReviewRestMapper'
import { ReviewMother } from 'src/infrastructure/product-details/projections/Review.mother.spec'
import { UsernameRestMapper } from 'src/infrastructure/shared/adapters/rest/mappers/UsernameRestMapper'

describe(`${ReviewRestMapper.name}`, () => {
  const usernameRestMapper = new UsernameRestMapper()

  let reviewRestMapper = new ReviewRestMapper()

  it('should map to dto', () => {
    const review = ReviewMother.one()

    const result = reviewRestMapper.toDTO(review)

    const expected = new ReviewRestDTO(
      usernameRestMapper.toDTO(review.ownerId),
      review.comment
    )

    expect(result).toStrictEqual(expected)
  })
})
