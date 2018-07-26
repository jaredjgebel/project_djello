import * as c from '../constants'
import { combineReducers } from 'redux'

function cardsById(state = {}, action) {
	switch (action.type) {
		case c.FETCH_CARDS_SUCCESS:
			const cards = [...action.payload.cards]

			const obj = cards.reduce((acc, card) => {
				const key = card.card.id

				if (!acc[key]) {
					acc[key] = card.card
				}

				return acc
			}, { ...state })

			return obj
		default:
			return state
	}
}

function allCardIds(state = [], action) {
	switch (action.type) {
		case c.FETCH_CARDS_SUCCESS:
			const cards = [...action.payload.cards]
			return cards.map(card => card.card.id).concat([...state])
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
		default:
			return state
	}
}

export const cards = combineReducers({
	byId: cardsById,
	allIds: allCardIds,
	ui: cardsUi,
})