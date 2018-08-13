import * as c from '../constants'
import { combineReducers } from 'redux'

export function listsById(state = {}, action) {
	switch (action.type) {
		case c.FETCH_LISTS_SUCCESS:
			const lists = action.payload && action.payload.lists

			if (lists === [] || !lists) {
				return {}
			}

			const obj = lists.reduce((acc, list) => {
				const key = list.id
				if (!acc[key]) {
					acc[key] = list
				}
				return acc
			}, { ...state })

			return obj

		case c.CREATE_LIST_SUCCESS:
			const list = { ...action.payload.list }

			return {
				...state,
				[list.id]: list,
			}

		case c.EDIT_LIST_SUCCESS:
			const editedList = { ...action.payload.list }

			return {
				...state,
				[editedList.id]: editedList,
			}

		case c.DELETE_LIST_SUCCESS:
			const deletedListId = action.payload.listId

			let copy = Object.assign({}, state)
			delete copy[deletedListId]

			return copy

		// update List.CardIds on creation of new card
		case c.CREATE_CARD_SUCCESS:
			const cardId = action.payload.card && action.payload.card.card && action.payload.card.card.id

			const listId = action.payload.listId

			return {
				...state,
				[listId]: {
					...state[listId],
					CardIds: state[listId].CardIds.concat(cardId)
				}
			}

		default:
			return state
	}
}

export function allIds(state = [], action) {
	switch (action.type) {
		case c.FETCH_LISTS_SUCCESS:
			if (!action.payload.lists) {
				return []
			}

			const lists = [...action.payload.lists]

			return lists.map(list => list.id)

		case c.CREATE_LIST_SUCCESS:
			const listId = action.payload.list && action.payload.list.id

			return [...state, listId]

		case c.DELETE_LIST_SUCCESS:
			const listIds = action.payload.board && action.payload.board.ListIds

			return listIds

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
		case c.CREATE_LIST_REQUEST:
			return {
				...state,
				isFetching: true,
			}
		case c.CREATE_LIST_SUCCESS:
			return {
				...state,
				isFetching: false,
			}
		case c.CREATE_LIST_FAILURE:
			return {
				...state,
				error: action.payload.error,
			}
		case c.EDIT_LIST_REQUEST:
			return {
				...state,
				isFetching: true,
			}
		case c.EDIT_LIST_SUCCESS:
			return {
				...state,
				isFetching: false,
			}
		case c.EDIT_LIST_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.error
			}
		case c.DELETE_LIST_REQUEST:
			return {
				...state,
				isFetching: true,
			}
		case c.DELETE_LIST_FAILURE:
			return {
				...state,
				isFetching: false,
			}
		case c.DELETE_LIST_SUCCESS:
			return {
				...state,
				isFetching: false,
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