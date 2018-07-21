import * as c from '../constants'
import { combineReducers } from 'redux'

export function boardsById(state = {}, action) {
	switch (action.type) {
		case c.FETCH_BOARDS_SUCCESS:
			const boards = [
				...action.payload.boards,
			]

			const obj = boards.reduce((acc, board) => {
				const key = board.id
				if (!acc[key]) {
					acc[key] = board
				}
				return acc
			}, {})

			return obj
		case c.CREATE_BOARD_SUCCESS:
			const board = { ...action.payload.board }

			return {
				...state,
				[board.board.id]: board.board,
			}
		default:
			return state
	}
}

export function allIds(state = [], action) {
	switch (action.type) {
		case c.FETCH_BOARDS_SUCCESS:
			const boards = [...action.payload.boards]
			return boards.map(board => board.id)
		case c.CREATE_BOARD_SUCCESS:
			return [...state, action.payload.board.board.id]
		default:
			return state
	}
}

const initialUiState = {
	current: null,
	isFetching: true,
	error: null,
}

export function boardUi(state = initialUiState, action) {
	switch (action.type) {
		case c.FETCH_BOARDS_REQUEST:
			return {
				...state,
				isFetching: true,
			}
		case c.FETCH_BOARDS_SUCCESS:
			return {
				...state,
				current: action.payload.boards[0],
				isFetching: false,
			}
		case c.FETCH_BOARDS_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.error,
			}
		case c.SWITCH_BOARD:
			return {
				...state,
				current: action.payload.selectedBoard,
			}
		case c.CREATE_BOARD_FAILURE:
			return {
				...state,
				error: action.payload.error,
			}
		default:
			return state
	}
}

export const boards = combineReducers({
	byId: boardsById,
	allIds: allIds,
	ui: boardUi,
})