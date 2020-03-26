const { utcToZonedTime, format } = require('date-fns-tz')

const timeZones = ({ time, timeZones }) => {
  const date = new Date(time)
  return {
    time,
    timeZones: timeZones.reduce((timeZones, timeZone) => {
      const zonedTime = utcToZonedTime(date, timeZone)
      timeZones[timeZone] = format(zonedTime, 'hh:mm:ss')
      return timeZones
    }, {})
  }
}

module.exports = timeZones
