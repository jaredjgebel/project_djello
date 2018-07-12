import * as c from '../constants'

const initialState = {
	isFetching: true,
	current: [],
	listIds: [],
	error: null,
}

export function lists(state = initialState, action) {
	switch (action.type) {
		case c.FETCH_LISTS:
			return {
				...state,
				isFetching: true,
			}
		case c.FETCH_LISTS_SUCCESS:
			return {
				...state,
				isFetching: false,
				current: action.lists,
				// listIds: action.lists.listIds,
			}
		case c.FETCH_LISTS_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.error,
			}
		default:
			return state
	}
}