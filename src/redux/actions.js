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

export function initSwitchBoards(selectedBoard) {
	return {
		type: c.SWITCH_BOARD,
		selectedBoard,
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

export function fetchUserRequest(userId) {
	return {
		type: c.FETCH_USER_REQUEST,
		userId,
	}
}

export function fetchUserSuccess(user) {
	return {
		type: c.FETCH_USER_SUCCESS,
		user,
	}
}

export function fetchUserFailure(error) {
	return {
		type: c.FETCH_USER_FAILURE,
		error,
	}
}

export function fetchUser(userId) {
	return (dispatch) => {
		dispatch(fetchUserRequest(userId))

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

export function fetchUserByTokenRequest(idToken) {
	return {
		type: c.FETCH_USER_BY_TOKEN_REQUEST,
		idToken,
	}
}

export function fetchUserByTokenSuccess(userId) {
	return {
		type: c.FETCH_USER_BY_TOKEN_SUCCESS,
		userId,
	}
}

export function fetchUserByTokenFailure(error) {
	return {
		type: c.FETCH_USER_BY_TOKEN_FAILURE,
		error,
	}
}

export function fetchUserByToken(idToken) {
	return (dispatch) => {
		dispatch(fetchUserByTokenRequest(idToken))

		const headers = new Headers({
			'Content-Type': 'application/json'
		})

		fetch(`${apiUrl}/users/token/${idToken}`, {
			method: 'GET',
			headers,
		})
			.then(response => {
				console.log('RESPONSE', response)
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`)
				}
				const json = response.json()
				return json
			})
			.then(json => {
				dispatch(fetchUserByTokenSuccess(json))
			})
			.catch(err => {
				dispatch(fetchUserByTokenFailure(err))
			})
	}
}
