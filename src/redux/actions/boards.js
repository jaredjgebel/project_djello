import * as c from '../constants'
const port = process.env.PORT || 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

// have user info, retrieving all boards
export function fetchBoardsRequest(userId) {
	return {
		type: c.FETCH_BOARDS_REQUEST,
		payload: {
			userId
		},
	}
}

export function fetchBoardsSuccess(boards) {
	return {
		type: c.FETCH_BOARDS_SUCCESS,
		payload: {
			boards
		},
	}
}

export function fetchBoardsFailure(error) {
	return {
		type: c.FETCH_BOARDS_FAILURE,
		payload: {
			error
		},
	}
}

export function fetchBoards(userId) {
	return (dispatch, getState) => {
		dispatch(fetchBoardsRequest(userId))

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/users/${userId}/boards`, {
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
				dispatch(fetchBoardsSuccess(json))
			})
			.catch(err => {
				dispatch(fetchBoardsFailure(err))
			})
	}
}

export function switchBoards(selectedBoard) {
	return {
		type: c.SWITCH_BOARD,
		payload: {
			selectedBoard
		},
	}
}

function createBoardRequest(userId) {
	return {
		type: c.CREATE_BOARD_REQUEST,
		payload: {
			userId,
		}
	}
}

function createBoardSuccess(board) {
	return {
		type: c.CREATE_BOARD_SUCCESS,
		payload: {
			board,
		}
	}
}

function createBoardFailure(error) {
	return {
		type: c.CREATE_BOARD_FAILURE,
		payload: {
			error,
		}
	}
}

export function createBoard(userId, title, description) {
	return (dispatch, getState) => {
		dispatch(createBoardRequest(userId))

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/boards/${userId}?title=${title}&description=${description}`, {
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
				dispatch(createBoardSuccess(json))
			})
			.catch(err => {
				dispatch(createBoardFailure(err))
			})
	}
}

function editBoardRequest(boardId) {
	return {
		type: c.EDIT_BOARD_REQUEST,
		payload: {
			boardId,
		}
	}
}

function editBoardSuccess(board) {
	return {
		type: c.EDIT_BOARD_SUCCESS,
		payload: {
			board,
		}
	}
}

function editBoardFailure(error) {
	return {
		type: c.EDIT_BOARD_FAILURE,
		payload: {
			error,
		}
	}
}

export function editBoard(boardId, title, description) {
	return (dispatch, getState) => {
		dispatch(editBoardRequest(boardId))

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/boards/${boardId}?title=${title}&description=${description}`, {
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
			.then(json => {
				dispatch(editBoardSuccess(json))
			})
			.catch(err => {
				dispatch(editBoardFailure(err))
			})
	}
}