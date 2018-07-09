import * as c from '../constants'
const port = process.env.PORT || 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

export function fetchListsRequest(boardId) {
   return {
      type: c.FETCH_LISTS_REQUEST,
      boardId,
   }
}

export function fetchListsSuccess(data) {
   return {
      type: c.FETCH_LISTS_SUCCESS,
      data,
   }
}

export function fetchListsFailure(error) {
   return {
      type: c.FETCH_LISTS_FAILURE,
      error,
   }
}

export function fetchLists(boardId) {
   return (dispatch) => {
      dispatch(fetchListsRequest(boardId))

      const headers = new Headers({
         'Content-Type': 'application/json'
      })

      fetch(`${apiUrl}/boards/${boardId}/lists`, {
         method: 'GET',
         headers,
      })
         .then(response => {
            console.log('RESPONSE', response)
            if (!response.ok) {
               throw new Error(`${response.status} ${response.statusText}`)
            }

            return response.json()
         })
         .then(json => {
            console.log('JSON', json)
            dispatch(fetchListsSuccess(json))
         })
         .catch(err => {
            console.log('error', err)
            dispatch(fetchListsFailure(err))
         })
   }
}