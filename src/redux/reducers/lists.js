import * as c from '../constants'
import { combineReducers } from 'redux'

export function listsById(state = {}, action) {
	switch (action.type) {
		case c.FETCH_LISTS_SUCCESS:
			const lists = [
				...action.payload.lists,
			]

			const obj = lists.reduce((acc, list) => {
				const key = list.id
				if (!acc[key]) {
					acc[key] = list
				}
				return acc
			}, {})

			return obj
		default:
			return state
	}
}

export function allIds(state = [], action) {
	switch (action.type) {
		case c.FETCH_LISTS_SUCCESS:
			const lists = [...action.payload.lists]
			return lists.map(list => list.id)
		default:
			return state
	}
}

const initialUiState = {
	isFetching: true,
	error: null,
}

export function listUi(state = initialUiState, action) {
	switch (action.type) {
		case c.FETCH_LISTS_REQUEST:
			return {
				...state,
				isFetching: true,
			}
		case c.FETCH_LISTS_SUCCESS:
			return {
				...state,
				isFetching: false,
			}
		case c.FETCH_LISTS_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.error,
			}
		default:
			return state
	}
}

export const lists = combineReducers({
	byId: listsById,
	allIds: allIds,
	ui: listUi,
})


// export function lists(state = initialState, action) {
// 	switch (action.type) {
// 		case c.FETCH_LISTS:
// 			return {
// 				...state,
// 				isFetching: true,
// 			}
// 		case c.FETCH_LISTS_SUCCESS:
// 			return {
// 				...state,
// 				isFetching: false,
// 				current: action.lists,
// 				// listIds: action.lists.listIds,
// 			}
// 		case c.FETCH_LISTS_FAILURE:
// 			return {
// 				...state,
// 				isFetching: false,
// 				error: action.error,
// 			}
// 		default:
// 			return state
// 	}
// }