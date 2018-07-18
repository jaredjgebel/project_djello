import * as c from '../constants'
import { combineReducers } from 'redux'

function historiesById(state = {}, action) {
   switch (action.type) {
      case c.FETCH_HISTORIES_SUCCESS:
         const histories = [...action.payload.histories]

         console.log(action.payload.histories)
         const obj = histories.reduce((acc, history) => {
            const key = history.id

            if (!acc[key]) {
               acc[key] = history
            }

            return acc
         }, {})

         return obj
      default:
         return state
   }
}

function allHistoryIds(state = [], action) {
   switch (action.type) {
      case c.FETCH_HISTORIES_SUCCESS:
         const histories = [...action.payload.histories]
         return histories.map(history => history.id)
      default:
         return state
   }
}

const initialUiState = {
   isFetching: true,
   error: null,
}

function historiesUi(state = initialUiState, action) {
   switch (action.type) {
      case c.FETCH_HISTORIES_REQUEST:
         return {
            ...state,
            isFetching: true,
         }
      case c.FETCH_HISTORIES_SUCCESS:
         return {
            ...state,
            isFetching: false,
         }
      case c.FETCH_HISTORIES_FAILURE:
         return {
            ...state,
            isFetching: false,
            error: action.payload.error,
         }
      default:
         return state
   }
}

export const histories = combineReducers({
   byId: historiesById,
   allIds: allHistoryIds,
   ui: historiesUi,
})