import * as c from '../constants'
const port = 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

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