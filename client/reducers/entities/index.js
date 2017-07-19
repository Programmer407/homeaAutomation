import { combineReducers } from 'redux'
import users from './users'
import accounts from './accounts'

export default combineReducers({
  users,
  accounts
})
