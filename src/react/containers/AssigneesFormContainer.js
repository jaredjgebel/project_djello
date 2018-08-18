import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Assignee from '../components/Assignee'
import { addAssigneeToCard, fetchExampleUsers } from '../../redux/actions/assignees'
import { getUser, getUserId } from '../../redux/selectors/userSelectors'
import { getCardAssignees } from '../../redux/selectors/cardSelectors'
import { getExampleAssignees, getExampleAssigneesStatus } from '../../redux/selectors/assigneeSelectors'
import HoverBorder from './HoverBorder'
import '../stylesheets/HoverBorder.css'

const mapStatetoProps = (state, ownProps) => {
	console.log(getExampleAssignees(state))
	return {
		isFetching: getExampleAssigneesStatus(state),
		exampleAssignees: getExampleAssignees(state),
		userId: getUserId(state),
		user: getUser(state),
		cardAssignees: getCardAssignees(ownProps.cardId)(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchExampleUsers: (userId) => {
			dispatch(fetchExampleUsers(userId))
		},
		addAssigneeToCard: (cardId, userId) => {
			dispatch(addAssigneeToCard(cardId, userId))
		},
	}
}

class AssigneesFormContainer extends Component {
	constructor() {
		super()
		// created refs to capture the state
		// of the HoverBorder and cardId when submitted
		this.click1 = React.createRef()
		this.click2 = React.createRef()
		this.click3 = React.createRef()
		this.click4 = React.createRef()
		this.click5 = React.createRef()

		this.editCardAssignee = this.editCardAssignee.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentDidMount() {
		this.props.fetchExampleUsers(this.props.userId)
	}

	onSubmit() {
		// only necessary to have one cardId
		const cardId = this.click1.current.props.cardId

		const click1 = {
			assigneeId: this.click1.current.props.assigneeId,
			selectedProps: this.click1.current.props.selected,
			selectedState: this.click1.current.state.selected,
		}

		const click2 = {
			assigneeId: this.click2.current.props.assigneeId,
			selectedProps: this.click2.current.props.selected,
			selectedState: this.click2.current.state.selected,
		}

		const click3 = {
			assigneeId: this.click3.current.props.assigneeId,
			selectedProps: this.click3.current.props.selected,
			selectedState: this.click3.current.state.selected,
		}

		const click4 = {
			assigneeId: this.click4.current.props.assigneeId,
			selectedProps: this.click4.current.props.selected,
			selectedState: this.click4.current.state.selected,
		}

		const click5 = {
			assigneeId: this.click5.current.props.assigneeId,
			selectedProps: this.click5.current.props.selected,
			selectedState: this.click5.current.state.selected,
		}

		this.editCardAssignee(click1.assigneeId, cardId, click1.selectedProps, click1.selectedState)
		this.editCardAssignee(click2.assigneeId, cardId, click2.selectedProps, click2.selectedState)
		this.editCardAssignee(click3.assigneeId, cardId, click3.selectedProps, click3.selectedState)
		this.editCardAssignee(click4.assigneeId, cardId, click4.selectedProps, click4.selectedState)
		this.editCardAssignee(click5.assigneeId, cardId, click5.selectedProps, click5.selectedState)
	}

	// HoverBorder receives initial selected state as a prop
	// HoverBorder submits final state of selection as selectedState
	// comparing to see if anything actually changed
	editCardAssignee(assigneeId, cardId, selectedProps, selectedState) {
		if (selectedProps !== selectedState) {
			if (selectedState === true) {
				// dispatch addAssigneeToCard
				console.log('dispatch addAssigneeToCard', assigneeId)
				this.props.addAssigneeToCard(cardId, assigneeId)
			}

			if (selectedState === false) {
				// dispatch removeAssigneeFromCard
				console.log('dispatch removeAssigneeFromCard', assigneeId)
			}
		}
	}

	render() {
		const { exampleAssignees, isFetching, user } = this.props

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
			assigneeElements = exampleAssignees.map((assignee, i) => {
				let selected = false

				if (cardAssignees) {
					// for each example assignee, if the assignee is already 
					// assigned to the card, pass selected=true to HoverBorder
					if (cardAssignees.includes(assignee.id)) {
						selected = true
					}
				}

				const refNum = `click${(i + 1).toString()}`

				return (
					<HoverBorder
						key={assignee.id}
						assigneeId={assignee.id}
						// indicates if assignee is already assigned to card
						selected={selected}
						editCardAssignee={this.editCardAssignee}
						cardId={this.props.cardId}
						ref={this[refNum]}
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
						<HoverBorder
							assigneeId={user.id}
							key={user.id}
							ref={this.click5}
						>
							<Assignee
								assignee={user}
								key={user.id}
							/>
						</HoverBorder>
					]
			}

			return (
				<div>
					{assigneeElements}
					<button className="btn btn-primary float-right" onClick={this.onSubmit}>Save Changes</button>
				</div>
			)
		}
	}
}

export default connect(
	mapStatetoProps,
	mapDispatchToProps
)(AssigneesFormContainer)

AssigneesFormContainer.propTypes = {
	isFetching: PropTypes.bool,
	exampleUsers: PropTypes.array,
}