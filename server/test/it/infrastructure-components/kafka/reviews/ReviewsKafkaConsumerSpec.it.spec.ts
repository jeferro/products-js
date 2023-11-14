import 'reflect-metadata'

import { ReviewsKafkaConsumerSpec } from 'src/infrastructure-components/kafka/reviews/ReviewsKafkaConsumerSpec'
import { ReviewsKafkaConsumerMock } from './ReviewsKafkaConsumerMock'
import { ReviewCreatedKafkaDTOMother } from 'src/infrastructure-components/kafka/reviews/dtos/ReviewCreatedKafkaDTO.mother.spec'
import { ReviewDeletedKafkaDTOMother } from 'src/infrastructure-components/kafka/reviews/dtos/ReviewDeletedKafkaDTO.mother.spec'
import { ReviewUpdatedKafkaDTOMother } from 'src/infrastructure-components/kafka/reviews/dtos/ReviewUpdatedKafkaDTO.mother.spec'
import { KafkaConsumerTestBootstraper } from '../KafkaConsumerTestBootstraper'


describe(`${ReviewsKafkaConsumerSpec.name} (e2e)`, () => {

  let testBootstraper = new KafkaConsumerTestBootstraper()

  let reviewsKafkaConsumerMock: ReviewsKafkaConsumerMock

  beforeAll(async () => {
    reviewsKafkaConsumerMock = await testBootstraper.start(ReviewsKafkaConsumerMock)
  })

  afterAll(async () => {
    await testBootstraper.stop()
  })

  describe('consume each', () => {
    it('should consume a review created event', async () => {
      const event = ReviewCreatedKafkaDTOMother.one()

      await testBootstraper.sendEnvelope(
        ReviewsKafkaConsumerMock.TOPIC,
        event,
        event.reviewId
      )

      const envelope = await reviewsKafkaConsumerMock.blockResult.waitForResult()

      expect(envelope.payload).toStrictEqual(event)
    })

    it('should consume a review updated event', async () => {
      const event = ReviewUpdatedKafkaDTOMother.one()

      await testBootstraper.sendEnvelope(
        ReviewsKafkaConsumerMock.TOPIC,
        event,
        event.reviewId
      )

      const envelope = await reviewsKafkaConsumerMock.blockResult.waitForResult()

      expect(envelope.payload).toEqual(event)
    })

    it('should consume a review deleted event', async () => {
      const event = ReviewDeletedKafkaDTOMother.one()

      await testBootstraper.sendEnvelope(
        ReviewsKafkaConsumerMock.TOPIC,
        event,
        event.reviewId
      )

      const envelope = await reviewsKafkaConsumerMock.blockResult.waitForResult()

      expect(envelope.payload).toEqual(event)
    })
  })

})
