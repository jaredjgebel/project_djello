import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import Assignee from '../components/Assignee'
import { fetchExampleUsers } from '../../redux/actions/assignees'
import { getUser, getUserId } from '../../redux/selectors/userSelectors';
import { getCardAssignees } from '../../redux/selectors/cardSelectors'
import HoverBorder from './HoverBorder';
import '../stylesheets/HoverBorder.css'

const mapStatetoProps = (state, ownProps) => {
	return {
		isFetching: state.assignees && state.assignees.examples && state.assignees.examples.isFetching,
		exampleAssignees: state.assignees && state.assignees.examples && state.assignees.examples.exampleUsers,
		userId: getUserId(state),
		user: getUser(state),
		cardAssignees: getCardAssignees(ownProps.cardId)(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchExampleUsers: (userId) => {
			dispatch(fetchExampleUsers(userId))
		}
	}
}

class AssigneesFormContainer extends Component {
	componentDidMount() {
		this.props.fetchExampleUsers(this.props.userId)

		// const cardAssignees = getCardAssignees(this.props.cardId, this.state)
		// console.log('cardAssignees', cardAssignees)
	}

	render() {
		const { exampleAssignees, isFetching, user, cardId } = this.props

		if (isFetching || !exampleAssignees) {
			return (
				<div>
					<p>Loading...</p>
				</div>
			)

		} else {
			// get assignee IDs for this card
			const { cardAssignees } = this.props

			let assigneeElements = []
			console.log('cardAssignees', cardAssignees)
			assigneeElements = exampleAssignees.map((assignee, i) => {
				let selected = false
				console.log('assigneeId', assignee.id)
				if (cardAssignees) {
					// for each example assignee, if the assignee is already 
					// assigned to the card, pass selected=true to HoverBorder
					if (cardAssignees.includes(assignee.id)) {
						selected = true
					}

				}

				console.log('selected', selected)

				return (
					<HoverBorder
						key={assignee.id}
						// indicates if assignee is already assigned to card
						selected={selected}

					>
						<Assignee
							assignee={assignee}
							key={assignee.id}
						/>
					</HoverBorder>
				)
			})


			if (user) {
				assigneeElements =
					[
						...assigneeElements,
						<HoverBorder id={user.id}>
							<Assignee assignee={user} key={user.id} />
						</HoverBorder>
					]
			}

			return (
				<div>
					{assigneeElements}
				</div>
			)
		}
	}
}

export default connect(
	mapStatetoProps,
	mapDispatchToProps
)(AssigneesFormContainer)