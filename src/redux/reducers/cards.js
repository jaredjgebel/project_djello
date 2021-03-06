import * as c from '../constants'
import { combineReducers } from 'redux'
import { createHistory } from '../actions/histories'

function cardsById(state = {}, action) {
	switch (action.type) {
		case c.FETCH_CARDS_SUCCESS:
			const cards = action.payload && action.payload.cards

			if (cards === [] || !cards) {
				return state
			}

			const obj = cards.reduce((acc, card) => {
				const key = card.card.id

				if (!acc[key]) {
					acc[key] = card.card
				}

				return acc
			}, { ...state })

			return obj

		case c.CREATE_CARD_SUCCESS:
			const card = { ...action.payload.card }

			return {
				...state,
				[card.card.id]: card.card,
			}

		case c.EDIT_CARD_SUCCESS:
			const editedCard = action.payload.card

			return {
				...state,
				[editedCard.id]: editedCard,
			}

		case c.DELETE_CARD_SUCCESS:
			const deletedCardId = action.payload.cardId

			let copy = Object.assign({}, state)
			delete copy[deletedCardId]

			return copy

		case c.ADD_ASSIGNEE_TO_CARD_SUCCESS:
			const thisCard = action.payload.card
			const assigneeId = action.payload.assigneeId

			return {
				...state,
				[thisCard.id]: {
					...state[thisCard.id],
					AssigneeIds: (state[thisCard.id].AssigneeIds ? state[thisCard.id].AssigneeIds.concat([assigneeId]) : [assigneeId])
				}
			}

		case c.REMOVE_ASSIGNEE_FROM_CARD_SUCCESS:
			const thiscard = action.payload.card
			const deletedAssigneeId = action.payload.assigneeId

			return {
				...state,
				[thiscard.id]: {
					...state[thiscard.id],
					AssigneeIds: state[thiscard.id].AssigneeIds.filter(assigneeId => (assigneeId !== deletedAssigneeId))
				}
			}

		case c.CREATE_HISTORY_SUCCESS:
			const newHistory = action.payload.history
			const changedCard = action.payload.card

			return {
				...state,
				[changedCard.id]: {
					...state[changedCard.id],
					HistoryIds: (state[changedCard.id].HistoryIds ? state[changedCard.id].HistoryIds.concat([newHistory.id]) : [newHistory])
				}
			}

		default:
			return state
	}
}

function allCardIds(state = [], action) {
	switch (action.type) {
		case c.FETCH_CARDS_SUCCESS:
			const cards = action.payload && action.payload.cards

			if (cards === [] || !cards) {
				return state
			}

			const newCardIds = cards.map(card => card.card.id)

			const unique = [...new Set([...state, ...newCardIds])]

			return unique

		case c.CREATE_CARD_SUCCESS:
			const cardId = action.payload.card && action.payload.card.card && action.payload.card.card.id

			return [...state, cardId]


		case c.DELETE_CARD_SUCCESS:
			const cardIds = action.payload.list && action.payload.list.CardIds

			return cardIds
		default:
			return state
	}
}

const initialUiState = {
	isFetching: true,
	error: null,
}

function cardsUi(state = initialUiState, action) {
	switch (action.type) {
		case c.FETCH_CARDS_REQUEST:
			return {
				...state,
				isFetching: true,
			}

		case c.FETCH_CARDS_SUCCESS:
			return {
				...state,
				isFetching: false,
			}

		case c.FETCH_CARDS_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.error,
			}

		case c.CREATE_CARD_REQUEST:
			return {
				...state,
				isFetching: true,
			}

		case c.CREATE_BOARD_SUCCESS:
			return {
				...state,
				isFetching: false,
			}

		case c.CREATE_CARD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.error,
			}

		case c.EDIT_CARD_REQUEST:
			return {
				...state,
				isFetching: true,
			}

		case c.EDIT_CARD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.error,
			}

		case c.EDIT_BOARD_SUCCESS:
			return {
				...state,
				isFetching: false,
			}

		case c.DELETE_CARD_REQUEST:
			return {
				...state,
				isFetching: true,
			}

		case c.DELETE_CARD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.error,
			}

		case c.DELETE_CARD_SUCCESS:
			return {
				...state,
				isFetching: false,
			}

		default:
			return state
	}
}

export const cards = combineReducers({
	byId: cardsById,
	allIds: allCardIds,
	ui: cardsUi,
})