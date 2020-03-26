import { utcToZonedTime, format } from 'date-fns-tz'

interface TimeZonesInput {
  time: string
  timeZones: string[]
}

interface TimeZonesResult {
  time: string
  timeZones: Record<string, string>
}

const timeZones = (options: TimeZonesInput): TimeZonesResult => {
  const { time, timeZones } = options
  const date = new Date(time)
  return {
    time,
    timeZones: timeZones.reduce((timeZones, timeZone) => {
      const zonedTime = utcToZonedTime(date, timeZone)
      timeZones[timeZone] = format(zonedTime, 'hh:mm:ss')
      return timeZones
    }, {}),
  }
}

export default timeZones
