import { ReviewMongoMapper } from './ReviewMongoMapper'
import { ReviewMongoDTOMother } from 'src/infrastructure-components/mongo/product-details/dtos/ReviewMongoDTO.mother.spec'
import { ReviewMother } from 'src/infrastructure/product-details/projections/Review.mother.spec'

describe(`${ReviewMongoMapper.name}`, () => {
  let reviewMongoMapper = new ReviewMongoMapper()

  it('should map to entity', () => {
    const reviewDTO = ReviewMongoDTOMother.one()

    const review = reviewMongoMapper.toEntity(reviewDTO)
    const result = reviewMongoMapper.toDTO(review)

    expect(result).toEqual(reviewDTO)
  })

  it('should map to dto', () => {
    const review = ReviewMother.one()

    const reviewDTO = reviewMongoMapper.toDTO(review)
    const result = reviewMongoMapper.toEntity(reviewDTO)

    expect(result).toStrictEqual(review)
  })

  it('should map to reviews', () => {
    const reviewDTOS = [
      ReviewMongoDTOMother.one(),
      ReviewMongoDTOMother.two()
    ]

    const reviews = reviewMongoMapper.toReviews(reviewDTOS)
    const result = reviewMongoMapper.toDtoList(reviews.values)

    expect(result).toEqual(reviewDTOS)
  })
})
