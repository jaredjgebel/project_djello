import * as c from '../constants'
const port = 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

function addAssigneeToCardRequest() {
	return {
		type: c.ADD_ASSIGNEE_TO_CARD_REQUEST
	}
}

function addAssigneeToCardSuccess(card, assigneeId) {
	return {
		type: c.ADD_ASSIGNEE_TO_CARD_SUCCESS,
		payload: {
			card,
			assigneeId,
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

export function addAssigneeToCard(cardId, userId) {
	return (dispatch, getState) => {
		dispatch(addAssigneeToCardRequest())

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/addassignee/${cardId}/${userId}`, {
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
				dispatch(addAssigneeToCardSuccess(card, userId))
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