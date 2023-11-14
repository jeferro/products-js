
import { DateUtil } from '../../../utils/DateUtil'
import { TimeService } from './TimeService'

export class FakeTimeService extends TimeService {
  private readonly dates: Date[]

  private current: number

  constructor(dates: Date[]) {
    super()

    this.dates = dates
    this.current = 0
  }

  static configure(...dates: Date[]) {
    const service = new FakeTimeService(dates)

    TimeService.instance = service
  }

  static configureOneMinuteLater(): Date {
    const date = DateUtil.addMinutesToNow(1)
    const service = new FakeTimeService([date])

    TimeService.instance = service

    return date
  }

  static configureFromArray(dates: Date[]) {
    const service = new FakeTimeService(dates)

    TimeService.instance = service
  }

  now(): Date {
    this.current++

    if (this.current >= this.dates.length) {
      this.current = 0
    }

    return this.dates[this.current]
  }
}
