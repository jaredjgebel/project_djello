import { combineReducers } from 'redux'
import { boards } from './boards'
import { lists } from './lists'
import { users } from './users'
import { cards } from './cards'
import { assignees } from './assignees'
import { histories } from './histories'

export const rootReducer = combineReducers({
   boards,
   lists,
   users,
   cards,
   assignees,
   histories
})


