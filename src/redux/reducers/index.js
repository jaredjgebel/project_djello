import { combineReducers } from 'redux'
import { boards } from './boards'
import { lists } from './lists'
import { users } from './users'
import { cards } from './cards'
import { assignees } from './assignees'

export const rootReducer = combineReducers({
   boards,
   lists,
   users,
   cards,
   assignees
})


