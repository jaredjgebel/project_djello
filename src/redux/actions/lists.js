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

export function fetchListsSuccess(lists = []) {
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
				console.log('lists', json)
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

function createListSuccess(response) {
	return {
		type: c.CREATE_LIST_SUCCESS,
		payload: {
			list: response.list,
			board: response.board,
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

export function createList(boardId, title = "", description = "") {
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
			.then(response => {
				return dispatch(createListSuccess(response))
			})
			.then(() => {
				dispatch(fetchLists(boardId))
			})
			.catch(err => {
				dispatch(createListFailure(err))
			})
	}
}

function editListRequest(listId) {
	return {
		type: c.EDIT_LIST_REQUEST,
		payload: {
			listId,
		}
	}
}

function editListSuccess(list) {
	return {
		type: c.EDIT_LIST_SUCCESS,
		payload: {
			list,
		}
	}
}

function editListFailure(error) {
	return {
		type: c.EDIT_LIST_FAILURE,
		payload: {
			error,
		}
	}
}

export function editList(listId, boardId, title = "", description = "") {
	return (dispatch, getState) => {
		dispatch(editListRequest(listId))

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/lists/${listId}?title=${title}&description=${description}`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${accessToken}`,
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`)
				}

				return response.json()
			})
			.then(list => {
				return dispatch(editListSuccess(list))
			})
			.then(() => {
				dispatch(fetchLists(boardId))
			})
			.catch(err => {
				dispatch(editListFailure(err))
			})
	}
}

function deleteListRequest(boardId, listId) {
	return {
		type: c.DELETE_LIST_REQUEST,
		payload: {
			boardId,
			listId,
		}
	}
}

function deleteListSuccess(listId, board) {
	return {
		type: c.DELETE_LIST_SUCCESS,
		payload: {
			listId,
			board,
		}
	}
}

function deleteListFailure(error) {
	return {
		type: c.DELETE_LIST_FAILURE,
		payload: {
			error,
		}
	}
}

export function deleteList(boardId, listId) {
	return (dispatch, getState) => {
		dispatch(deleteListRequest(boardId, listId))

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/boards/${boardId}/lists/${listId}`, {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${accessToken}`,
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`)
				}

				return response.json()
			})
			.then(board => {
				return dispatch(deleteListSuccess(listId, board))
			})
			.then(() => {
				dispatch(fetchLists(boardId))
			})
			.catch(err => {
				dispatch(deleteListFailure(err))
			})
	}
}