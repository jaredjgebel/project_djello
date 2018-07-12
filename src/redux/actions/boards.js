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

export function initSwitchBoards(selectedBoard) {
	return {
		type: c.SWITCH_BOARD,
		payload: {
			selectedBoard
		},
	}
}