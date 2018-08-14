import * as c from '../constants'
const port = process.env.PORT || 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

function fetchCardsRequest(listId) {
	return {
		type: c.FETCH_CARDS_REQUEST,
		payload: {
			listId,
		}
	}
}

function fetchCardsSuccess(cards) {
	return {
		type: c.FETCH_CARDS_SUCCESS,
		payload: {
			cards,
		}
	}
}

function fetchCardsFailure(error) {
	return {
		type: c.FETCH_CARDS_FAILURE,
		payload: {
			error,
		}
	}
}

export function fetchCards(listId) {
	return (dispatch, getState) => {
		dispatch(fetchCardsRequest(listId))

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/lists/${listId}/cards`, {
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
			.then(json => {
				dispatch(fetchCardsSuccess(json))
			})
			.catch(err => {
				console.log('error', err)
				dispatch(fetchCardsFailure(err))
			})
	}
}

function createCardRequest(listId) {
	return {
		type: c.CREATE_CARD_REQUEST,
		payload: {
			listId,
		}
	}
}

function createCardSuccess(card, listId) {
	return {
		type: c.CREATE_CARD_SUCCESS,
		payload: {
			card,
			listId,
		}
	}
}

function createCardFailure(error) {
	return {
		type: c.CREATE_CARD_FAILURE,
		payload: {
			error,
		}
	}
}

export function createCard(listId, title, description) {
	return (dispatch, getState) => {
		dispatch(createCardRequest(listId))

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/lists/${listId}/cards?title=${title}&description=${description}`, {
			method: 'POST',
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
			.then(json => {
				return dispatch(createCardSuccess(json, listId))
			})
			.then(() => {
				dispatch(fetchCards(listId))
			})
			.catch(err => {
				dispatch(createCardFailure(err))
			})
	}
}

function editCardRequest(cardId) {
	return {
		type: c.EDIT_CARD_REQUEST,
		payload: {
			cardId,
		}
	}
}

function editCardSuccess(card) {
	return {
		type: c.EDIT_CARD_SUCCESS,
		payload: {
			card,
		}
	}
}

function editCardFailure(error) {
	return {
		type: c.EDIT_CARD_FAILURE,
		payload: {
			error,
		}
	}
}

export function editCard(cardId, title, description) {
	return (dispatch, getState) => {
		dispatch(editCardRequest(cardId))

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/cards/${cardId}?title=${title}&description=${description}`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
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
				return dispatch(editCardSuccess(card))
			})
			.then(() => {
				dispatch(fetchCards(listId))
			})
			.catch(err => {
				dispatch(editCardFailure(err))
			})
	}
}

function deleteCardRequest(listId, cardId) {
	return {
		type: c.DELETE_CARD_REQUEST,
		payload: {
			listId,
			cardId,
		}
	}
}

function deleteCardSuccess(list, cardId) {
	return {
		type: c.DELETE_CARD_SUCCESS,
		payload: {
			list,
			cardId,
		}
	}
}

function deleteCardFailure(error) {
	return {
		type: c.DELETE_CARD_FAILURE,
		payload: {
			error,
		}
	}
}

export function deleteCard(listId, cardId) {
	return (dispatch, getState) => {
		dispatch(deleteCardRequest(listId, cardId))

		const accessToken = getState().users.accessToken

		fetch(`${apiUrl}/lists/${listId}/cards/${cardId}`, {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${accessToken}`,
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`)
				}

				return response.json()
			})
			.then(list => {
				return dispatch(deleteCardSuccess(list, cardId))
			})
			.then(() => {
				dispatch(fetchCards(listId))
			})
			.catch(err => {
				dispatch(deleteCardFailure(err))
			})
	}
}