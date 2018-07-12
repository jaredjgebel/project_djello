import * as c from '../constants'

const initialState = {
	isFetchingToken: true,
	isFetching: false,
	isFetchingId: true,
	error: null,
	id: null,
	first: '',
	last: '',
	email: '',
	photo: '',
	idToken: '',
	accessToken: '',
}

export function users(state = initialState, action) {
	switch (action.type) {
		case c.FETCH_TOKEN_REQUEST:
			return {
				...state,
				isFetchingToken: true,
			}
		case c.FETCH_TOKEN_SUCCESS:
			return {
				...state,
				isFetchingToken: false,
				accessToken: action.token,
			}
		case c.FETCH_TOKEN_FAILURE:
			return {
				...state,
				isFetchingToken: false,
				error: action.error,
			}
		case c.FETCH_USER_BY_TOKEN_REQUEST:
			return {
				...state,
				isFetchingId: true,
				idToken: action.idToken,
				accessToken: action.accessToken,
			}
		case c.FETCH_USER_BY_TOKEN_SUCCESS:
			return {
				...state,
				isFetchingId: false,
				id: action.userId,
			}
		case c.FETCH_USER_BY_TOKEN_FAILURE:
			return {
				...state,
				isFetchingId: false,
				error: action.error,
			}
		case c.FETCH_USER_REQUEST:
			return {
				...state,
				isFetching: true,
			}
		case c.FETCH_USER_SUCCESS:
			return {
				...state,
				isFetching: false,
				id: action.user.id,
				first: action.user.first,
				last: action.user.last,
				email: action.user.email,
				photo: action.user.photo,
			}
		case c.FETCH_USER_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.error,
			}
		default:
			return state
	}
}