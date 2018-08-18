import * as c from '../constants'
import { combineReducers } from 'redux'

function historiesById(state = {}, action) {
	switch (action.type) {
		case c.FETCH_HISTORIES_SUCCESS:
			const histories = action.payload && action.payload.histories

			if (histories === [] || !histories) {
				return {}
			}

			const obj = histories.reduce((acc, history) => {
				const key = history.id

				if (!acc[key]) {
					acc[key] = history
				}

				return acc
			}, { ...state })

			return obj

		case c.CREATE_HISTORY_SUCCESS:
			const newHistory = action.payload.history

			return {
				...state,
				[newHistory.id]: newHistory,
			}

		default:
			return state
	}
}

function allHistoryIds(state = [], action) {
	switch (action.type) {
		case c.FETCH_HISTORIES_SUCCESS:
			const histories = action.payload && action.payload.histories

			if (!histories || histories === []) {
				return []
			}

			return histories.map(history => history.id)

		case c.CREATE_HISTORY_SUCCESS:
			const newHistory = action.payload.history

			return [...state, newHistory.id]

		default:
			return state
	}
}

const initialUiState = {
	isFetching: true,
	error: null,
}

function historiesUi(state = initialUiState, action) {
	switch (action.type) {
		case c.FETCH_HISTORIES_REQUEST:
		case c.CREATE_HISTORY_REQUEST:
			return {
				...state,
				isFetching: true,
			}

		case c.FETCH_HISTORIES_SUCCESS:
		case c.CREATE_HISTORY_SUCCESS:
			return {
				...state,
				isFetching: false,
			}

		case c.FETCH_HISTORIES_FAILURE:
		case c.CREATE_HISTORY_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.error,
			}

		default:
			return state
	}
}

export const histories = combineReducers({
	byId: historiesById,
	allIds: allHistoryIds,
	ui: historiesUi,
})