// libs
import TimeZone from '../models/TimeZone'

export const findTimeZoneById = (id): Promise<any> =>
  TimeZone.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })
