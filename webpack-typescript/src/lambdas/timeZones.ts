import { S3 } from 'aws-sdk'
import { utcToZonedTime, format } from 'date-fns-tz'

interface TimeZonesInput {
  time: string
  timeZones: string[]
}

interface TimeZonesResult {
  time: string
  timeZones: Record<string, Record<string, string>>
}

const timeZones = async (
  options: TimeZonesInput,
  s3: S3
): Promise<TimeZonesResult> => {
  const { time, timeZones } = options

  const date = new Date(time)
  const weatherImage = await s3.getSignedUrlPromise('getObject', {
    Bucket: 'serverless-webpack-example',
    Key: 'sun.png',
  })

  return {
    time,
    timeZones: timeZones.reduce((timeZones, timeZone) => {
      const zonedTime = utcToZonedTime(date, timeZone)
      timeZones[timeZone] = {
        time: format(zonedTime, 'hh:mm:ss'),
        weatherImage,
      }
      return timeZones
    }, {}),
  }
}

export default timeZones
