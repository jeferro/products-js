export abstract class DateUtil {
  static addMinutes(date: Date, minutes: number): Date {
    const newTime = date.getTime() + 1000 * 60 * minutes

    return new Date(newTime)
  }

  static subtractMinutes(date: Date, minutes: number): Date {
    const newTime = date.getTime() - 1000 * 60 * minutes

    return new Date(newTime)
  }

  static addMinutesToNow(minutes: number): Date {
    const now = new Date()

    return DateUtil.addMinutes(now, minutes)
  }
}
