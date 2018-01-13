import { combineReducers } from 'redux'
import users from './users'
import accounts from './account'
import homes from './home'


export default combineReducers({
  users,accounts,homes
})
