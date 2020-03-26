import { S3 } from 'aws-sdk'
import timeZones from './lambdas/timeZones'

const s3 = new S3()

/**
 * Example post body
 * {
 *   "time": "2020-03-25Z16:01:36.386Z",
 *   "timeZones": [
 *     "America/Los_Angeles",
 *     "America/Denver",
 *     "America/Chicago",
 *     "America/New_York"
 *   ]
 * }
 */
export const handler = async event => {
  const data = JSON.parse(event.body)
  const result = await timeZones(data, s3)

  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2),
  }
}
