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
			}, { ...state })

			return obj

		case c.CREATE_BOARD_SUCCESS:
			const board = { ...action.payload.board }

			return {
				...state,
				[board.board.id]: board.board,
			}

		case c.EDIT_BOARD_SUCCESS:
			const editedBoard = { ...action.payload.board }

			return {
				...state,
				[editedBoard.id]: editedBoard,
			}

		case c.DELETE_BOARD_SUCCESS:
			const boardId = action.payload.boardId

			let copy = Object.assign({}, state)
			delete copy[boardId]

			return copy

		default:
			return state
	}
}

export function allIds(state = [], action) {
	switch (action.type) {
		case c.FETCH_BOARDS_SUCCESS:
			const boards = [...state, ...action.payload.boards]
			return boards.map(board => board.id)

		case c.CREATE_BOARD_SUCCESS:
			return [...state, action.payload.board.board.id]

		case c.DELETE_BOARD_SUCCESS:
			return state.filter(id => id !== action.payload.boardId)

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

		case c.CREATE_BOARD_REQUEST:
			return {
				...state,
				isFetching: true,
			}

		case c.CREATE_BOARD_FAILURE:
			return {
				...state,
				error: action.payload.error,
				isFetching: false,
			}

		case c.CREATE_BOARD_SUCCESS:
			return {
				...state,
				isFetching: false,
				current: action.payload.board.board,
			}

		case c.EDIT_BOARD_REQUEST:
			return {
				...state,
				isFetching: true,
			}

		case c.EDIT_BOARD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.error,
			}

		case c.EDIT_BOARD_SUCCESS:
			return {
				...state,
				isFetching: false,
				current: action.payload.board,
			}

		case c.DELETE_BOARD_REQUEST:
			return {
				...state,
				isFetching: true,
			}

		case c.DELETE_BOARD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.error,
			}

		case c.DELETE_BOARD_SUCCESS:
			return {
				...state,
				isFetching: false,
				current: null,
			}

		// must update current board ListIds
		// on new board creation
		case c.CREATE_LIST_SUCCESS:
			const listId = action.payload.list && action.payload.list.id

			return {
				...state,
				current: {
					...state.current,
					ListIds: state.current.ListIds.concat(listId)
				}
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