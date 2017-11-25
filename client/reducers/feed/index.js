import { combineReducers } from 'redux';
import dashboard from './dashboard'
import history from './history'
import currentStatus from './currentStatus'

export default combineReducers({
    dashboard,
    history,
    currentStatus
})