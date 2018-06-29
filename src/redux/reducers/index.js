import * as c from '../constants'

const initialState = {
   userId: null,
   allUserBoards: [],
   current: {},
   isFetching: false,
   error: null,
}

export function boards(state = initialState, action) {
   switch (action.type) {
      case c.FETCH_BOARDS:
         return {
            ...state,
            isFetching: true,
            userId: action.userId,
         }
      case c.FETCH_BOARDS_SUCCESS:
         return {
            ...state,
            allUserBoards: action.data,
            current: action.data[0],
            isFetching: false,
         }
      case c.FETCH_BOARDS_FAILURE:
         return {
            ...state,
            isFetching: false,
            error: action.error,
         }
      default:
         return state
   }
}