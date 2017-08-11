import { combineReducers } from 'redux'
import users from './users'
import accounts from './accounts'
import transactions from './transactions'

export default combineReducers({
  users,
  accounts,
  transactions
})
