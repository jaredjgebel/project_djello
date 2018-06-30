import * as c from '../constants'

const initialState = {
   boardId: null,
   isFetching: false,
   current: [],
}

export function lists(state = initialState, action) {
   switch (action.type) {
      case c.FETCH_LISTS:
         return {
            ...state,
            isFetching: true,
            boardId: action.boardId,
         }
      case c.FETCH_LISTS_SUCCESS:
         return {
            ...state,
            isFetching: false,
            current: action.lists,
         }
      case c.FETCH_LISTS_FAILURE:
         return {
            ...state,
            isFetching: false,
            error: action.error,
         }
      default:
         return state
   }
}