import { combineReducers } from 'redux'
import { boards } from './boards'
import { lists } from './lists'

export const rootReducer = combineReducers({
   boards,
   lists,
})


