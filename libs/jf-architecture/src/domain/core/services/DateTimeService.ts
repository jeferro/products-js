import { TimeService } from './TimeService'

export class DateTimeService extends TimeService {
  static configure() {
    const service = new DateTimeService()

    TimeService.instance = service
  }

  now(): Date {
    return new Date()
  }
}
