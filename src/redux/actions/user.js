import { KJUR } from 'jsrsasign'
import * as c from '../constants'
import { fetchBoards } from './boards';
const port = process.env.PORT || 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

// Retrieve token to access data API
export function fetchTokenRequest() {
	return {
		type: c.FETCH_TOKEN_REQUEST,
	}
}

export function fetchTokenSuccess(token) {
	return {
		type: c.FETCH_TOKEN_SUCCESS,
		token,
	}
}

export function fetchTokenFailure(error) {
	return {
		type: c.FETCH_TOKEN_FAILURE,
		error,
	}
}

export function fetchApiToken() {
	return (dispatch) => {
		dispatch(fetchTokenRequest())

		return fetch(`${apiUrl}/user/access`, {
			method: 'GET',
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`)
				}

				return response.json()
			})
			.then(json => {
				const tokenObj = JSON.parse(json)
				dispatch(fetchTokenSuccess(tokenObj.access_token))
			})
			.catch(err => {
				dispatch(fetchTokenFailure(err))
			})
	}
}

export function fetchUserByTokenRequest(idToken, accessToken) {
	return {
		type: c.FETCH_USER_BY_TOKEN_REQUEST,
		idToken,
		accessToken,
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

// fetch userId based on credentials
export function fetchUserByToken(accessToken, idToken) {
	return (dispatch) => {
		dispatch(fetchUserByTokenRequest(idToken, accessToken))

		return fetch(`${apiUrl}/user/token`, {
			method: 'GET',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${accessToken}`,
				'X-idToken': `${idToken}`
			}
		})
			.then(response => {
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

// Fetch user information
export function fetchUserRequest() {
	return {
		type: c.FETCH_USER_REQUEST,
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
	return (dispatch, getState) => {
		dispatch(fetchUserRequest())

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/users/${userId}`, {
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
				dispatch(fetchUserSuccess(json))
			})
			.catch(err => {
				dispatch(fetchUserFailure(err))
			})
	}
}

// dispatches fetchAPI token, fetchUserByToken, and fetchBoards in that order (each needs the result of the previous step)
export function fetchTokenAndUser() {
	return (dispatch, getState) => {
		return dispatch(fetchApiToken())
			.then(() => {
				if (localStorage && localStorage.id_token) {
					const parsedIdToken = KJUR.jws.JWS.parse(localStorage.id_token)
					// subject of the payloadObj
					const idToken = parsedIdToken.payloadObj.sub
					return idToken
				}
			})
			.then((idToken) => {
				const accessToken = getState().users.accessToken
				return dispatch(fetchUserByToken(accessToken, idToken))
			})
			.then(() => {
				dispatch(fetchBoards(getState().users.id))
			})
			.catch(err => {
				console.log(err)
			})
	}
}
