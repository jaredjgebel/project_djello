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
		type: c.CREATE_LIST_REQUEST,
		payload: {
			listId,
		}
	}
}

function createCardSuccess(card) {
	return {
		type: c.CREATE_CARD_SUCCESS,
		payload: {
			card,
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
				dispatch(createCardSuccess(json))
			})
			.catch(err => {
				dispatch(createCardFailure(err))
			})
	}
}