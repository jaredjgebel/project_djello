import * as c from '../constants'
import { combineReducers } from 'redux'

function cardsById(state = {}, action) {
	switch (action.type) {
		case c.FETCH_CARDS_SUCCESS:
			const cards = action.payload && action.payload.cards

			if (cards === [] || !cards) {
				return {}
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

		case c.DELETE_CARD_SUCCESS:
			const deletedCardId = action.payload.cardId

			let copy = Object.assign({}, state)
			delete copy[deletedCardId]

			return copy

		default:
			return state
	}
}

function allCardIds(state = [], action) {
	switch (action.type) {
		case c.FETCH_CARDS_SUCCESS:
			const cards = action.payload && action.payload.cards

			if (cards === [] || !cards) {
				return []
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