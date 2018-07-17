import * as c from '../constants'
const port = process.env.PORT || 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

export function fetchCardsRequest(listId) {
   return {
      type: c.FETCH_CARDS_REQUEST,
      listId,
   }
}

export function fetchCardsSuccess(cards) {
   return {
      type: c.FETCH_CARDS_SUCCESS,
      cards,
   }
}

export function fetchCardsFailure(error) {
   return {
      type: c.FETCH_CARDS_FAILURE,
      error,
   }
}