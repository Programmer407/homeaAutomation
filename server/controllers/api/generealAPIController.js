
 // libs
 import express from 'express'
 import crypto from 'crypto'

 // src

 const router = express.Router()

 router.get('/api/dashboardData', (req,res) => {
     console.log("Dashbboard api has been called");
     var DashboardData = {
         "overview": {
             "bulb": {
                 "totalon": 1,
                     "total": 3
             },
             "fan": {
                 "totalon": 2,
                     "total": 3
             },
             "mode": {
                 "id": 1,
                     "name": "Automatic"
             }
         },
         "temp_sensor_log": [
             {
                 "sensorlog_id": 1,
                 "value": 23,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T22:59:59.999Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 4,
                 "value": 25,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T23:59:59.999Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 20,
                 "value": 23,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T21:59:59.999Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 21,
                 "value": 23,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T08:50:44.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 22,
                 "value": 11,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T08:53:20.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 23,
                 "value": 67,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T08:54:32.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 24,
                 "value": 65,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T23:04:09.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 25,
                 "value": 45,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T01:31:56.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 26,
                 "value": 34,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:12:12.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 27,
                 "value": 32,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:25:49.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 28,
                 "value": 45,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:28:30.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 29,
                 "value": 33,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:29:53.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 30,
                 "value": 45,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:30:29.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 31,
                 "value": 67,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:40:46.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 32,
                 "value": 43,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:42:09.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 33,
                 "value": 45,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:43:19.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 34,
                 "value": 34,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:43:53.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 35,
                 "value": 35,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:45:23.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 36,
                 "value": 67,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:49:20.000Z",
                 "sensorSensorId": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "value": 0,
                     "sensorTypeStId": 1,
                     "palacePalaceId": 1
                 }
             }
         ],
             "light_sensor_log": [
             {
                 "sensorlog_id": 6,
                 "value": 456,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T21:59:59.999Z",
                 "sensorSensorId": 4,
                 "sensor": {
                     "sensor_id": 4,
                     "name": "Light Level",
                     "value": 394,
                     "sensorTypeStId": 2,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 7,
                 "value": 476,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T22:59:59.999Z",
                 "sensorSensorId": 4,
                 "sensor": {
                     "sensor_id": 4,
                     "name": "Light Level",
                     "value": 394,
                     "sensorTypeStId": 2,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 38,
                 "value": 324,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:34:23.000Z",
                 "sensorSensorId": 4,
                 "sensor": {
                     "sensor_id": 4,
                     "name": "Light Level",
                     "value": 394,
                     "sensorTypeStId": 2,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 39,
                 "value": 567,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:34:57.000Z",
                 "sensorSensorId": 4,
                 "sensor": {
                     "sensor_id": 4,
                     "name": "Light Level",
                     "value": 394,
                     "sensorTypeStId": 2,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 40,
                 "value": 874,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T03:23:45.000Z",
                 "sensorSensorId": 4,
                 "sensor": {
                     "sensor_id": 4,
                     "name": "Light Level",
                     "value": 394,
                     "sensorTypeStId": 2,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 43,
                 "value": 224,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:45:23.000Z",
                 "sensorSensorId": 4,
                 "sensor": {
                     "sensor_id": 4,
                     "name": "Light Level",
                     "value": 394,
                     "sensorTypeStId": 2,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 44,
                 "value": 345,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T08:50:44.000Z",
                 "sensorSensorId": 4,
                 "sensor": {
                     "sensor_id": 4,
                     "name": "Light Level",
                     "value": 394,
                     "sensorTypeStId": 2,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 45,
                 "value": 644,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T09:45:23.000Z",
                 "sensorSensorId": 4,
                 "sensor": {
                     "sensor_id": 4,
                     "name": "Light Level",
                     "value": 394,
                     "sensorTypeStId": 2,
                     "palacePalaceId": 1
                 }
             },
             {
                 "sensorlog_id": 47,
                 "value": 343,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T09:23:21.000Z",
                 "sensorSensorId": 4,
                 "sensor": {
                     "sensor_id": 4,
                     "name": "Light Level",
                     "value": 394,
                     "sensorTypeStId": 2,
                     "palacePalaceId": 1
                 }
             }
         ],
             "bulb_log": [
             {
                 "switchlog_id": 1,
                 "status": 1,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T21:59:59.999Z",
                 "total": 3,
                 "total_on": 2,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 2,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T22:01:59.999Z",
                 "total": 3,
                 "total_on": 1,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 3,
                 "status": 1,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T22:02:59.999Z",
                 "total": 3,
                 "total_on": 2,
                 "switchSwitchId": 3,
                 "switch": {
                     "switch_id": 3,
                     "name": "wall bulb",
                     "status": 1,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 2
                 }
             },
             {
                 "switchlog_id": 8,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T19:59:59.999Z",
                 "total": 3,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 12,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T01:46:12.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 13,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T01:50:56.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 14,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T01:54:42.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 15,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T01:56:07.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 16,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T01:57:41.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 17,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:02:39.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 18,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:02:46.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 19,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:06:40.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 20,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:06:52.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 21,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:08:27.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 22,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:49:55.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 23,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:50:34.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 24,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T23:04:30.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 25,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T16:43:43.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 26,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T17:27:53.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             }
         ],
             "fan_log": [
             {
                 "switchlog_id": 1,
                 "status": 1,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T21:59:59.999Z",
                 "total": 3,
                 "total_on": 2,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 2,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T22:01:59.999Z",
                 "total": 3,
                 "total_on": 1,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 3,
                 "status": 1,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T22:02:59.999Z",
                 "total": 3,
                 "total_on": 2,
                 "switchSwitchId": 3,
                 "switch": {
                     "switch_id": 3,
                     "name": "wall bulb",
                     "status": 1,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 2
                 }
             },
             {
                 "switchlog_id": 8,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T19:59:59.999Z",
                 "total": 3,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 12,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T01:46:12.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 13,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T01:50:56.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 14,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T01:54:42.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 15,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T01:56:07.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 16,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T01:57:41.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 17,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:02:39.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 18,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:02:46.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 19,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:06:40.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 20,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:06:52.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 21,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:08:27.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 22,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:49:55.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 23,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T02:50:34.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 24,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T23:04:30.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 25,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T16:43:43.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             },
             {
                 "switchlog_id": 26,
                 "status": 0,
                 "date": "2017-07-21T00:00:00.000Z",
                 "time": "1970-01-01T17:27:53.000Z",
                 "total": 0,
                 "total_on": 0,
                 "switchSwitchId": 1,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "status": 0,
                     "applianceApplianceId": 1,
                     "palacePalaceId": 1
                 }
             }
         ],
             "widget": [
             {
                 "did": 5,
                 "area": "widget_area",
                 "palace": 1,
                 "user_name": "ali@gmail.com",
                 "floor": 1,
                 "sensor": null,
                 "switch": {
                     "switch_id": 1,
                     "name": "table bulb",
                     "appliance_id": 1,
                     "palace_id": 1,
                     "status": 0
                 }
             },
             {
                 "did": 6,
                 "area": "widget_area",
                 "palace": 1,
                 "user_name": "ali@gmail.com",
                 "floor": 1,
                 "sensor": {
                     "sensor_id": 1,
                     "name": "Temperature",
                     "palace_id": 1,
                     "value": 0
                 }
             },
             {
                 "did": 8,
                 "area": "widget_area",
                 "palace": 1,
                 "user_name": "ali@gmail.com",
                 "floor": 1,
                 "sensor": {
                     "sensor_id": 4,
                     "name": "Light Level",
                     "palace_id": 1,
                     "value": 394
                 }
             }
         ]
     }
         res
             .status(200)
             .send({
                 DashboardData
             })
 })

 router.get('/api/currentStatusData', (req,res) => {
     console.log("Current Status api has been called");
      var now = {
         "floors": [
             {
                 "floor_id": 1,
                 "name": "My Ground Floor",
                 "homeHomeId": 1,
                 "floorTypeFloorId": 1,
                 "floor_type": {
                     "floor_id": 1,
                     "type": "Ground Floor"
                 }
             },
             {
                 "floor_id": 2,
                 "name": "My First Floor",
                 "homeHomeId": 1,
                 "floorTypeFloorId": 2,
                 "floor_type": {
                     "floor_id": 2,
                     "type": "First Floor"
                 }
             }
         ],
             "palaces": [
             {
                 "palace_id": 1,
                 "name": "living room",
                 "floorFloorId": 1,
                 "palaceTypePalaceId": 1,
                 "palace_type": {
                     "palace_id": 1,
                     "type": "Room"
                 }
             },
             {
                 "palace_id": 2,
                 "name": "Guest room",
                 "floorFloorId": 1,
                 "palaceTypePalaceId": 1,
                 "palace_type": {
                     "palace_id": 1,
                     "type": "Room"
                 }
             },
             {
                 "palace_id": 3,
                 "name": "hall",
                 "floorFloorId": 2,
                 "palaceTypePalaceId": 2,
                 "palace_type": {
                     "palace_id": 2,
                     "type": "Hall"
                 }
             }
         ],
             "switches": [
             {
                 "switch_id": 1,
                 "name": "table bulb",
                 "status": 0,
                 "applianceApplianceId": 1,
                 "palacePalaceId": 1,
                 "appliance": {
                     "appliance_id": 1,
                     "type": "Light"
                 }
             },
             {
                 "switch_id": 2,
                 "name": "Ceiling Fan",
                 "status": 0,
                 "applianceApplianceId": 2,
                 "palacePalaceId": 1,
                 "appliance": {
                     "appliance_id": 2,
                     "type": "Fan"
                 }
             },
             {
                 "switch_id": 3,
                 "name": "wall bulb",
                 "status": 1,
                 "applianceApplianceId": 1,
                 "palacePalaceId": 2,
                 "appliance": {
                     "appliance_id": 1,
                     "type": "Light"
                 }
             },
             {
                 "switch_id": 4,
                 "name": "Fan",
                 "status": 1,
                 "applianceApplianceId": 2,
                 "palacePalaceId": 2,
                 "appliance": {
                     "appliance_id": 2,
                     "type": "Fan"
                 }
             },
             {
                 "switch_id": 5,
                 "name": "Roof bulb",
                 "status": 0,
                 "applianceApplianceId": 1,
                 "palacePalaceId": 3,
                 "appliance": {
                     "appliance_id": 1,
                     "type": "Light"
                 }
             },
             {
                 "switch_id": 6,
                 "name": "wall Fan",
                 "status": 1,
                 "applianceApplianceId": 2,
                 "palacePalaceId": 3,
                 "appliance": {
                     "appliance_id": 2,
                     "type": "Fan"
                 }
             }
         ],
             "sensors": [
             {
                 "sensor_id": 1,
                 "name": "Temperature",
                 "value": 0,
                 "sensorTypeStId": 1,
                 "palacePalaceId": 1,
                 "sensor_type": {
                     "st_id": 1,
                     "name": "temp"
                 }
             },
             {
                 "sensor_id": 4,
                 "name": "Light Level",
                 "value": 394,
                 "sensorTypeStId": 2,
                 "palacePalaceId": 1,
                 "sensor_type": {
                     "st_id": 2,
                     "name": "light"
                 }
             },
             {
                 "sensor_id": 5,
                 "name": "Temperature",
                 "value": 24,
                 "sensorTypeStId": 1,
                 "palacePalaceId": 2,
                 "sensor_type": {
                     "st_id": 1,
                     "name": "temp"
                 }
             },
             {
                 "sensor_id": 6,
                 "name": "Light level",
                 "value": 843,
                 "sensorTypeStId": 2,
                 "palacePalaceId": 2,
                 "sensor_type": {
                     "st_id": 2,
                     "name": "light"
                 }
             },
             {
                 "sensor_id": 7,
                 "name": "Temperature",
                 "value": 21,
                 "sensorTypeStId": 1,
                 "palacePalaceId": 3,
                 "sensor_type": {
                     "st_id": 1,
                     "name": "temp"
                 }
             },
             {
                 "sensor_id": 8,
                 "name": "Light Level",
                 "value": 348,
                 "sensorTypeStId": 2,
                 "palacePalaceId": 3,
                 "sensor_type": {
                     "st_id": 2,
                     "name": "light"
                 }
             }
         ],
             "mode": {
             "id": 1,
                 "name": "Automatic"
         }
     }
     res
         .status(200)
         .send({
             now
         })
 })
 router.get('/api/historyData', (req,res) => {
     console.log("History api has been called");
     var history = {
         "logs": [
             {
                 "msg": "In Floor \"My Ground Floor\"   ,Palace name \"living room\"   , Switch of \"table bulb\"   , Turn \" ON \" By \"Ali\"  .",
                 "time": "2017-06-11T10:20:33.000Z"
             },
             {
                 "msg": "In Floor \"My Ground Floor\"   ,Palace name \"living room\"   , Switch of \"table bulb\"   , Turn \" OFF \" By \"Ali\"  .",
                 "time": "2017-06-11T20:20:33.000Z"
             },
             {
                 "msg": "In Floor \"My Ground Floor\"   ,Palace name \"living room\"   , Switch of \"Ceiling Fan\"   , Turn \" OFF \" By \"Sakib\"  .",
                 "time": "2017-06-11T20:21:33.000Z"
             },
             {
                 "msg": "In Floor \"My Ground Floor\"   ,Palace name \"living room\"   , Switch of \"Ceiling Fan\"   , Turn \" OFF \" By \"Ali\"  .",
                 "time": "2017-06-11T20:23:33.000Z"
             },
             {
                 "msg": "In Floor \"My Ground Floor\"   ,Palace name \"Guest room\"   , Switch of \"wall bulb\"   , Turn \" OFF \" By \"Ali\"  .",
                 "time": "2017-06-11T20:24:33.000Z"
             },
             {
                 "msg": "In Floor \"My Ground Floor\"   ,Palace name \"Guest room\"   , Switch of \"Fan\"   , Turn \" OFF \" By \"Ali\"  .",
                 "time": "2017-06-11T20:24:33.000Z"
             },
             {
                 "msg": "In Floor \"My Ground Floor\"   ,Palace name \"Guest room\"   , Switch of \"Fan\"   , Turn \" OFF \" By \"Ali\"  .",
                 "time": "2017-06-11T21:24:33.000Z"
             },
             {
                 "msg": "In Floor \"My First Floor\"   ,Palace name \"hall\"   , Switch of \"Roof bulb\"   , Turn \" OFF \" By \"Ali\"  .",
                 "time": "2017-06-11T21:26:33.000Z"
             },
             {
                 "msg": "In Floor \"My First Floor\"   ,Palace name \"hall\"   , Switch of \"wall Fan\"   , Turn \" OFF \" By \"Ali\"  .",
                 "time": "2017-06-11T22:26:33.000Z"
             },
             {
                 "msg": "In Floor \"My First Floor\"   ,Palace name \"hall\"   , Switch of \"wall Fan\"   , Turn \" OFF \" By \"Ali\"  .",
                 "time": "2017-06-12T01:26:33.000Z"
             },
             {
                 "msg": "In Floor \"My First Floor\"   ,Palace name \"hall\"   , Switch of \"Roof bulb\"   , Turn \" OFF \" By \"Sakib\"  .",
                 "time": "2017-06-12T04:26:33.000Z"
             }
         ]
     }
     res
         .status(200)
         .send({
             history
         })
 })

 export default router
