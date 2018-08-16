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

			return array.compact(assigneeIds)

		// const assignees = [...state]
		// cards.forEach((card) => {
		// 	if (card.assignees !== [] || card.assignees) {
		// 		const cardAssignees = card.assignees || []
		// 		const ids = cardAssignees.map(assignee => assignee.id)
		// 		ids.forEach(id => assignees.concat(id))
		// 	}
		// })

		// return assignees

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
			return {
				...state,
				isFetching: false,
				error: action.payload.error,
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


// const cards = action.payload && action.payload.cards

// const newAssigneeIds = cards.map(card => {
// 	let assigneeIds = card.card.AssigneeIds 
// 	if (assigneeIds === []) return state

// 	return assigneeIds 
// })

// // const newAssigneeIds = cards.map(card => {
// // 	return card.assignees.map(assignee => (assignee.id))
// // })

// array.flatten(newAssigneeIds) 
// array.compact(newAssigneeIds) 
