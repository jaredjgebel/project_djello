import * as c from './constants'
const port = process.env.PORT || 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

// have user info, retrieving all boards
export function fetchBoardsRequest(userId) {
   return {
      type: c.FETCH_BOARDS_REQUEST,
      userId,
   }
}

export function fetchBoardsSuccess(data) {
   return {
      type: c.FETCH_BOARDS_SUCCESS,
      data,
   }
}

export function fetchBoardsFailure(error) {
   return {
      type: c.FETCH_BOARDS_FAILURE,
      error,
   }
}

export function fetchBoards(userId) {
   return (dispatch) => {
      dispatch(fetchBoardsRequest)

      const headers = new Headers({
         'Content-Type': 'application/json'
      })

      fetch(`${apiUrl}/users/${userId}/boards`, {
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
            dispatch(fetchBoardsSuccess(json))
         })
         .catch(err => {
            dispatch(fetchBoardsFailure(err))
         })
   }
}