import * as c from '../constants'

const initialState = {
   isFetching: true,
   fetchingId: '',
   cards: [],
   error: null,
}

export function cards(state = initialState, action) {
   switch (action.type) {
      case c.FETCH_CARDS_REQUEST:
         return {
            ...state,
            isFetching: true,
            fetchingId: action.listId,
         }
      case c.FETCH_CARDS_SUCCESS:
         return {
            ...state,
            isFetching: false,
            cards: action.cards,
         }
      case c.FETCH_CARDS_FAILURE:
         return {
            ...state,
            isFetching: false,
            error: action.error,
         }
      default:
         return state
   }
}