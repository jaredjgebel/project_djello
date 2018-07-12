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

export function fetchListsSuccess(lists) {
	return {
		type: c.FETCH_LISTS_SUCCESS,
		lists,
	}
}

export function fetchListsFailure(error) {
	return {
		type: c.FETCH_LISTS_FAILURE,
		error,
	}
}

export function fetchLists(boardId) {
	return (dispatch, getState) => {
		dispatch(fetchListsRequest(boardId))

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/boards/${boardId}/lists`, {
			method: 'GET',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${accessToken}`,
			}
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