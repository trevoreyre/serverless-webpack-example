const { utcToZonedTime, format } = require('date-fns-tz')

const timeZones = async ({ time, timeZones }, s3) => {
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
        weatherImage
      }
      return timeZones
    }, {})
  }
}

module.exports = timeZones
