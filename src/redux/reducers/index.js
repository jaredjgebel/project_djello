import { combineReducers } from 'redux'
import { boards } from './boards'
import { lists } from './lists'
import { users } from './users'

export const rootReducer = combineReducers({
   boards,
   lists,
   users,
})


