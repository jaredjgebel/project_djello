import * as c from '../constants'

const initialState = {
	isFetching: false,
	isFetchingId: true,
	error: null,
	id: null,
	first: '',
	last: '',
	email: '',
	photo: '',
	token: '',
}

export function users(state = initialState, action) {
	switch (action.type) {
		case c.FETCH_USER_BY_TOKEN_REQUEST:
			return {
				...state,
				isFetchingId: true,
				token: action.idToken,
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
		default:
			return state
	}
}