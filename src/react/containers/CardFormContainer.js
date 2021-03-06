import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createCard, editCard } from '../../redux/actions/cards'
import { getUser } from '../../redux/selectors/userSelectors';

const mapStateToProps = state => {
	return {
		user: getUser(state),
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createCard: (listId, user, title, description, complete) => {
			dispatch(createCard(listId, user, title, description, complete))
		},
		editCard: (cardId, listId, user, title, description, complete) => {
			dispatch(editCard(cardId, listId, user, title, description, complete))
		},
	}
}

class CardFormContainer extends Component {
	constructor() {
		super()
		this.state = {
			titleFeedback: null,
			descriptionFeedback: null,
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.title = React.createRef()
		this.description = React.createRef()
	}

	handleSubmit(e) {
		e.preventDefault()

		const { action, cardId, listId, user, complete } = this.props

		const title = this.title.current.value
		const description = this.description.current.value

		const titleFeedback = title.length < 255 ? "is-valid" : "is-invalid"
		const descriptionFeedback = description.length < 255 ? "is-valid" : "is-invalid"

		this.setState({ titleFeedback })
		this.setState({ descriptionFeedback })

		if (titleFeedback === "is-valid" && descriptionFeedback === "is-valid") {
			// dispatch action
			if (action === "new-card") {
				this.props.createCard(listId, user, title, description, complete)
			} else if (action === "edit-card") {
				this.props.editCard(cardId, listId, user, title, description, complete)
			}
		}

		document.querySelector('body').classList.remove('modal-open')
	}

	render() {
		const { action, cardTitle, cardDescription } = this.props

		const titleInvalidDiv = this.state.titleFeedback === "is-invalid" ? <div className="invalid-feedback">Card title must be less than 255 characters.</div> : null

		const descriptionInvalidDiv = this.state.descriptionFeedback === "is-invalid" ? <div className="invalid-feedback">Card description must be less than 255 characters.</div> : null

		const titlePlaceholder = action === "new-card" ? "Title" : null
		const descriptionPlaceholder = action === "new-card" ? "Description" : null

		const titleValue = action === "edit-card" ? cardTitle : null
		const descriptionValue = action === "edit-card" ? cardDescription : null

		return (
			<form>
				<div className="form-group">
					<input
						type="text"
						name="title"
						id="cardTitle"
						placeholder={titlePlaceholder}
						defaultValue={titleValue}
						className={`form-control ${this.state.titleFeedback}`}
						ref={this.title}
					/>
					{titleInvalidDiv}
				</div>
				<div className="form-group">
					<input
						type="text"
						name="description"
						id="cardDescription"
						placeholder={descriptionPlaceholder}
						defaultValue={descriptionValue}
						className={`form-control ${this.state.descriptionFeedback}`}
						ref={this.description}
					/>
					{descriptionInvalidDiv}
				</div>
				<button
					type="submit"
					onClick={this.handleSubmit}
					className="btn btn-primary float-right"
				>
					Submit Card
               </button>
			</form>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CardFormContainer)

CardFormContainer.propTypes = {
	listId: PropTypes.number,
	createCard: PropTypes.func,
}