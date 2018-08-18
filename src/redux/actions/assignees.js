import * as c from '../constants'
import { createHistory } from '../actions/histories'
const port = 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

function addAssigneeToCardRequest() {
	return {
		type: c.ADD_ASSIGNEE_TO_CARD_REQUEST
	}
}

function addAssigneeToCardSuccess(card, assigneeId, assignee) {
	return {
		type: c.ADD_ASSIGNEE_TO_CARD_SUCCESS,
		payload: {
			card,
			assigneeId,
			assignee,
		}
	}
}

function addAssigneeToCardFailure(error) {
	return {
		type: c.ADD_ASSIGNEE_TO_CARD_FAILURE,
		payload: {
			error,
		}
	}
}

function addAssigneeAndCreateHistory(card, assigneeId, assignee, user) {
	return dispatch => {
		dispatch(addAssigneeToCardSuccess(card, assigneeId, assignee))
		dispatch(createHistory(card.id, `${assignee.first} ${assignee.last.slice(0, 1)}. assigned to card by ${user.first} ${user.last.slice(0, 1)}.`))
	}
}

export function addAssigneeToCard(cardId, assigneeId, assignee, user) {
	return (dispatch, getState) => {
		dispatch(addAssigneeToCardRequest())

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/addassignee/${cardId}/${assigneeId}`, {
			method: 'PUT',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${accessToken}`,
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`)
				}

				return response.json()
			})
			.then(card => {
				dispatch(addAssigneeAndCreateHistory(card, assigneeId, assignee, user))
			})
			.catch(err => {
				console.log('error', err)
				dispatch(addAssigneeToCardFailure(err))
			})
	}
}

function fetchExampleUsersRequest() {
	return {
		type: c.FETCH_EXAMPLE_USERS_REQUEST
	}
}

function fetchExampleUsersSuccess(users) {
	return {
		type: c.FETCH_EXAMPLE_USERS_SUCCESS,
		payload: {
			users,
		}
	}
}

function fetchExampleUsersFailure(error) {
	return {
		type: c.FETCH_EXAMPLE_USERS_FAILURE,
		payload: {
			error,
		}
	}
}

export function fetchExampleUsers(userId) {
	return (dispatch, getState) => {
		dispatch(fetchExampleUsersRequest())

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/assignees/${userId}`, {
			method: 'GET',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${accessToken}`,
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`)
				}

				return response.json()
			})
			.then(users => {
				console.log(users)
				dispatch(fetchExampleUsersSuccess(users))
			})
			.catch(err => {
				dispatch(fetchExampleUsersFailure(err))
			})
	}
}

function removeAssigneeFromCardRequest() {
	return {
		type: c.REMOVE_ASSIGNEE_FROM_CARD_REQUEST
	}
}

function removeAssigneeFromCardSuccess(card, assigneeId) {
	return {
		type: c.REMOVE_ASSIGNEE_FROM_CARD_SUCCESS,
		payload: {
			card,
			assigneeId,
		}
	}
}

function removeAssigneeFromCardFailure(error) {
	return {
		type: c.REMOVE_ASSIGNEE_FROM_CARD_FAILURE,
		payload: {
			error,
		}
	}
}

export function removeAssigneeFromCard(cardId, assigneeId, assignee, user) {
	return (dispatch, getState) => {
		dispatch(removeAssigneeFromCardRequest())

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/removeassignee/${cardId}/${assigneeId}`, {
			method: 'PUT',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${accessToken}`,
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`)
				}

				return response.json()
			})
			.then(card => {
				dispatch(removeAssigneeFromCardSuccess(card, assigneeId))
				dispatch(createHistory(card.id, `${user.first} ${user.last.slice(0, 1)}. removed ${assignee.first} ${assignee.last.slice(0, 1)}. from card`))
			})
			.catch(err => {
				console.log('error', err)
				dispatch(removeAssigneeFromCardFailure(err))
			})
	}
}