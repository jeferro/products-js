import { KafkaProducerTestBootstraper } from '../KafkaProducerTestBootstraper'
import { plainToInstance } from 'class-transformer'
import { Class } from 'jf-architecture'
import { KafkaDTO } from 'jf-nestjs-kafka'
import { ReviewsKafkaProducer } from 'src/infrastructure-components/kafka/reviews/ReviewsKafkaProducer'
import { ReviewCreatedKafkaDTOMother } from 'src/infrastructure-components/kafka/reviews/dtos/ReviewCreatedKafkaDTO.mother.spec'
import { ReviewUpdatedKafkaDTOMother } from 'src/infrastructure-components/kafka/reviews/dtos/ReviewUpdatedKafkaDTO.mother.spec'
import { ReviewDeletedKafkaDTOMother } from 'src/infrastructure-components/kafka/reviews/dtos/ReviewDeletedKafkaDTO.mother.spec'
import { ReviewEventKafkaDTO } from 'src/infrastructure-components/kafka/reviews/dtos/ReviewEventKafkaDTO'
import { ReviewDeletedKafkaDTO } from 'src/infrastructure-components/kafka/reviews/dtos/ReviewDeletedKafkaDTO'
import { ReviewUpdatedKafkaDTO } from 'src/infrastructure-components/kafka/reviews/dtos/ReviewUpdatedKafkaDTO'
import { ReviewCreatedKafkaDTO } from 'src/infrastructure-components/kafka/reviews/dtos/ReviewCreatedKafkaDTO'

describe(`${ReviewsKafkaProducer.name} (e2e)`, () => {
  const TOPIC = 'reviews-topic'

  let testBootstraper = new KafkaProducerTestBootstraper()

  let reviewsKafkaProducer: ReviewsKafkaProducer

  beforeAll(async () => {
    reviewsKafkaProducer = await testBootstraper.start(
      ReviewsKafkaProducer,
      TOPIC,
    )
  })

  afterAll(async () => {
    await testBootstraper.stop()
  })

  describe('publish each', () => {
    it('should publish a review created event', async () => {
      const event = ReviewCreatedKafkaDTOMother.one()

      await reviewsKafkaProducer.publish(
        TOPIC,
        event
      )

      const envelopeRaw = await testBootstraper.waitForEnvelope()

      checkReviewEventResult(
        envelopeRaw, 
        ReviewCreatedKafkaDTO,
        event
      )
    })

    it('should publish a review updated event', async () => {
      const event = ReviewUpdatedKafkaDTOMother.one()

      await reviewsKafkaProducer.publish(
        TOPIC,
        event
      )

      const envelopeRaw = await testBootstraper.waitForEnvelope()

      checkReviewEventResult(
        envelopeRaw, 
        ReviewUpdatedKafkaDTO,
        event
      )
    })

    it('should publish a review deleted event', async () => {
      const event = ReviewDeletedKafkaDTOMother.one()

      await reviewsKafkaProducer.publish(
        TOPIC,
        event
      )

      const envelopeRaw = await testBootstraper.waitForEnvelope()

      checkReviewEventResult(
        envelopeRaw, 
        ReviewDeletedKafkaDTO,
        event
      )
    })
  })

  function checkReviewEventResult(
    envelopeRaw: Record<string, any>, 
    eventClass: Class<KafkaDTO>,
    event: ReviewEventKafkaDTO,
  ) {
    const result = plainToInstance(
      eventClass, 
      envelopeRaw.payload
    )
  
    expect(result).toEqual(event)
  }
})


