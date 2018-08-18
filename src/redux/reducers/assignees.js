import * as c from '../constants'
import { combineReducers } from 'redux'
import array from 'lodash/array'

function assigneesById(state = {}, action) {
	switch (action.type) {
		case c.FETCH_CARDS_SUCCESS:
			const cards = action.payload && action.payload.cards

			if (cards === [] || !cards) {
				return state
			}

			const assignees = []

			cards.forEach(card => {
				const cardAssignees = card.assignees

				if (cardAssignees)
					cardAssignees.forEach(assignee => {
						assignees.push(assignee)
					})
			})

			const obj = assignees.reduce((acc, assignee) => {
				const key = assignee.id
				if (!acc[key]) {
					acc[key] = assignee
				}

				return acc
			}, { ...state })

			return obj

		case c.ADD_ASSIGNEE_TO_CARD_SUCCESS:
			const assigneeId = action.payload.assigneeId

			// if assignee is already in obj
			if (Object.keys(state).includes(assigneeId)) {
				return state
			}

			return {
				...state,
				[assigneeId]: {
					...state[assigneeId],

				}
			}

		default:
			return state
	}
}

function allAssigneeIds(state = [], action) {
	switch (action.type) {
		case c.FETCH_CARDS_SUCCESS:
			const cards = action.payload && action.payload.cards

			if (cards === [] || !cards) {
				return state
			}

			const assigneeIds = cards.map(card => {
				if (card.assignees) {
					return card.assignees.map((assignee => assignee.id))
				}
			})

			return array.compact([...state, ...assigneeIds])

		case c.ADD_ASSIGNEE_TO_CARD_SUCCESS:
			const cardId = action.payload.card && action.payload.card.id

			if (!state.includes(cardId)) {
				return [...state, ...cardId]
			}

			return state

		default:
			return state
	}
}

const initState = {
	isFetching: false,
	exampleUsers: [],
	error: null,
}

function examples(state = initState, action) {
	switch (action.type) {
		case c.FETCH_EXAMPLE_USERS_REQUEST:
		case c.ADD_ASSIGNEE_TO_CARD_REQUEST:
			return {
				...state,
				isFetching: true,
			}

		case c.FETCH_EXAMPLE_USERS_SUCCESS:
			return {
				...state,
				isFetching: false,
				exampleUsers: action.payload.users,
			}

		case c.FETCH_EXAMPLE_USERS_FAILURE:
		case c.ADD_ASSIGNEE_TO_CARD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.error,
			}

		case c.ADD_ASSIGNEE_TO_CARD_SUCCESS:
			return {
				...state,
				isFetching: false,
			}

		default:
			return state
	}
}

export const assignees = combineReducers({
	byId: assigneesById,
	allIds: allAssigneeIds,
	examples,
})
