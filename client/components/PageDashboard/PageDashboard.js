//libs
import React from 'react';
import { connect } from 'react-redux';




//src
import PageDashboardInner from './PageDashboardInner'
import {fetchDashboardData} from '../../actions/entities/dashboard'
import {fetchCurrentStatusData} from '../../actions/entities/currentStatus'
import PageLoading from '../PageLoading';

const mapStateToProps = (state, ownProps) => {
    const {feed : {dashboard : {dashboard : {DashboardData}}}} = state
    const {feed : {dashboard : {isLoading }}} = state
    const {feed : {currentStatus : {currentStatus : {now}}}} = state


    return {DashboardData,isLoading,now}
}

@connect(mapStateToProps,{fetchDashboardData,fetchCurrentStatusData})

export default class PageAdminDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            DashboardData : {
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
            },
            floorSelected : '',
            roomSelected : '',
        }
        this.afterFloorSelected = this.afterFloorSelected.bind(this);
        this.afterRoomSelected = this.afterRoomSelected.bind(this);
        this.handleFloorSelected = this.handleFloorSelected.bind(this);
        this.handleRoomSelected  = this.handleRoomSelected.bind(this);
    }

    componentDidMount(){
        const {fetchDashboardData} = this.props
        fetchDashboardData();
        const {fetchCurrentStatusData} = this.props
        fetchCurrentStatusData();
        setTimeout(() => {
            this.setState({
                floorSelected : this.props.now.floors[0].floor_id ?  this.props.now.floors[0].floor_id : "" ,
                roomSelected : this.props.now.palaces[0].palace_id ?  this.props.now.palaces[0].palace_id : ""
            })
        }, 1000);
    }

    componentWillMount(){

    }


    afterFloorSelected(e){
        this.setState({floorSelected: e.target.value});
    }

    afterRoomSelected(e){
        this.setState({roomSelected: e.target.value});
    }

    handleFloorSelected(event, index, value){
        if(value == ""){
            this.setState({
                roomSelected : ""
            })
        }
        this.setState({floorSelected: value});
    }

    handleRoomSelected(event, index, value){
        this.setState({roomSelected: value});
    }


    render(){
        const {isLoading,DashboardData,now} = this.props
        if(isLoading == true || DashboardData == undefined)
            return <PageLoading/>

        return(
            <PageDashboardInner {...this.props}
                DashboardData = {DashboardData}
                NowData = {now}
                floorSelected = {this.state.floorSelected}
                roomSelected  = {this.state.roomSelected}
                handleFloorSelected = {this.handleFloorSelected}
                handleRoomSelected = {this.handleRoomSelected}
                isLoading = {isLoading}

            />
        )
    }
}