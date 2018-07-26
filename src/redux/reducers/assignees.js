import * as c from '../constants'
import { combineReducers } from 'redux'

function assigneesById(state = {}, action) {
	switch (action.type) {
		case c.FETCH_CARDS_SUCCESS:
			console.log('CARDS', action.payload.cards)
			const cards = [...action.payload.cards]

			const assignees = []

			cards.forEach(card => {
				const cardAssignees = card.assignees

				if (cardAssignees)
					cardAssignees.forEach(assignee => {
						assignees.push(assignee)
					})
			})

			const obj = assignees.reduce((acc, assignee) => {
				console.log('ASSIGNEE', assignee)
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
			const cards = [...action.payload.cards]

			const assignees = [...state]
			cards.forEach((card) => {
				if (card.assignees !== [] || card.assignees) {
					const cardAssignees = card.assignees || []
					const ids = cardAssignees.map(assignee => assignee.id)
					ids.forEach(id => assignees.concat(id))
				}
			})

			return assignees
		default:
			return state
	}
}

export const assignees = combineReducers({
	byId: assigneesById,
	allIds: allAssigneeIds,
})