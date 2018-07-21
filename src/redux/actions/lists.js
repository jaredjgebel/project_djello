import * as c from '../constants'
const port = process.env.PORT || 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

export function fetchListsRequest(boardId) {
	return {
		type: c.FETCH_LISTS_REQUEST,
		payload: {
			boardId,
		}
	}
}

export function fetchListsSuccess(lists) {
	return {
		type: c.FETCH_LISTS_SUCCESS,
		payload: {
			lists,
		}
	}
}

export function fetchListsFailure(error) {
	return {
		type: c.FETCH_LISTS_FAILURE,
		payload: {
			error,
		}
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
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`)
				}

				return response.json()
			})
			.then(json => {
				dispatch(fetchListsSuccess(json))
			})
			.catch(err => {
				console.log('error', err)
				dispatch(fetchListsFailure(err))
			})
	}
}

function createListRequest(boardId) {
	return {
		type: c.CREATE_LIST_REQUEST,
		payload: {
			boardId,
		}
	}
}

function createListSuccess(list) {
	return {
		type: c.CREATE_LIST_SUCCESS,
		payload: {
			list,
		}
	}
}

function createListFailure(error) {
	return {
		type: c.CREATE_LIST_FAILURE,
		payload: {
			error,
		}
	}
}

export function createList(boardId, title, description) {
	return (dispatch, getState) => {
		dispatch(createListRequest(boardId))

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/boards/${boardId}/lists?title=${title}&description=${description}`, {
			method: 'POST',
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
				dispatch(createListSuccess(json))
			})
			.catch(err => {
				dispatch(createListFailure(err))
			})
	}
}