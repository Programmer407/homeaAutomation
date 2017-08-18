import moment from 'moment'

// By default, moment parses and displays in local time.
// If you want to parse or display a moment in UTC, you can use moment.utc() instead of moment().

const getUTCMillisFromDate = (date, format) => {  
  return moment.utc(date, format).valueOf()
}

export default{
  getUTCMillisFromDate: getUTCMillisFromDate
}
