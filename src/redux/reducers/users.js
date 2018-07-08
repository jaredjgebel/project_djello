import * as c from '../constants'

const initialState = {
   isFetching: false,
   error: '',
   id: '',
   first: '',
   last: '',
   email: '',
   photo: '',
   token: '',
}

export function users(state = initialState, action) {
   switch (action.type) {
      case c.FETCH_USER_BY_TOKEN_REQUEST:
         return {
            ...state,
            isFetching: true,
            token: action.idToken,
         }
      case c.FETCH_USER_BY_TOKEN_SUCCESS:
         return {
            ...state,
            isFetching: false,
            id: action.userId,
         }
      case c.FETCH_USER_BY_TOKEN_FAILURE:
         return {
            ...state,
            isFetching: false,
            error: action.error,
         }
      default:
         return state
   }
}