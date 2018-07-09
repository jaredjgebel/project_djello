import * as c from '../constants'

const initialState = {
	allUserBoards: [],
	current: {},
	isFetching: false,
	error: null,
}

export function boards(state = initialState, action) {
	switch (action.type) {
		case c.FETCH_BOARDS:
			return {
				...state,
				isFetching: true,
			}
		case c.FETCH_BOARDS_SUCCESS:
			return {
				...state,
				allUserBoards: action.data,
				current: action.data[0],
				isFetching: false,
			}
		case c.FETCH_BOARDS_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.error,
			}
		case c.SWITCH_BOARD:
			return {
				...state,
				currentBoard: action.selectedBoard,
			}
		default:
			return state
	}
}