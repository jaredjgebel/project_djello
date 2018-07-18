import * as c from '../constants'
const port = process.env.PORT || 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

function fetchHistoriesRequest(cardId) {
   return {
      type: c.FETCH_HISTORIES_REQUEST,
      payload: {
         cardId,
      }
   }
}

function fetchHistoriesSuccess(histories) {
   return {
      type: c.FETCH_HISTORIES_SUCCESS,
      payload: {
         histories,
      }
   }
}

function fetchHistoriesFailure(error) {
   return {
      type: c.FETCH_HISTORIES_FAILURE,
      payload: {
         error,
      }
   }
}

export function fetchHistories(cardId) {
   return (dispatch, getState) => {
      dispatch(fetchHistoriesRequest(cardId))

      const accessToken = getState().users.accessToken

      fetch(`${apiUrl}/cards/${cardId}/histories`, {
         method: 'GET',
         credentials: "include",
         headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`,
         }
      })
         .then(response => {
            if (!response.ok) {
               throw new Error(`${response.status} ${response.statusText}`)
            }

            return response.json()
         })
         .then(json => {
            dispatch(fetchHistoriesSuccess(json))
         })
         .catch(err => {
            console.log('error', err)
            dispatch(fetchHistoriesFailure(err))
         })
   }
}