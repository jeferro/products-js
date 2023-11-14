export abstract class TimeService {
  protected static instance: TimeService

  abstract now(): Date

  static now(): Date {
    if (!TimeService.instance) {
      throw Error('TimeService is not configured correctly')
    }

    return TimeService.instance.now()
  }
}
