import moment from 'moment'
import tmp from 'tmp'
import fs from 'fs'
import q from 'q'
import path from 'path'

const getFileData = (event) => {
  const start = moment.utc(event.startsAt).format('YYYYMMDDTHHmmss') + 'Z'
  const end = moment.utc(event.startsAt + event.duration).format('YYYYMMDDTHHmmss') + 'Z'
  
  return "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTAMP:" + start +
    "\nDTSTART:" + start +
    "\nDTEND:" + end +
    "\nLOCATION:" + event.location + 
    "\nSUMMARY:" + event.title + 
    "\nEND:VEVENT\nEND:VCALENDAR"
}

const returnIcsFile = (res, event) => {
  let promise = q.defer()
  
  const data = getFileData(event)
  
  tmp.tmpName((err, filePath) => {
    if (err) 
      promise.reject(err)
          
    const fileName = path.basename(filePath)
    const finalFilePath = path.resolve(`./server/work/${fileName}`)
    
    fs.writeFile(finalFilePath, data, (fsErr) => {
      if (fsErr)
        promise.reject(fsErr)
              
      promise.resolve(finalFilePath)
    })
  })
  
  return promise.promise
}


export default {
  // insertEventInGoogleCalendar : insertEventInGoogleCalendar
  returnIcsFile: returnIcsFile
}
