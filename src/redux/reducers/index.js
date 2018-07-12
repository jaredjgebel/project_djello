import { combineReducers } from 'redux'
import { boards } from './boards'
import { lists } from './lists'
import { users } from './users'
import { cards } from './cards'

export const rootReducer = combineReducers({
   boards,
   lists,
   users,
   cards,
})


