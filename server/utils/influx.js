// libs
import { InfluxDB } from 'influx'

// src
import config from '../../config/app.config'

export const MEASUREMENT_NAME_STATUS_NODE = 'status_node'
export const MEASUREMENT_NAME_STATUS_ENVIRONMENT = 'status_environment'
export const MEASUREMENT_NAME_STATUS_SYSTEM = 'status_system'

export const influx = new InfluxDB(config.influx.url)
