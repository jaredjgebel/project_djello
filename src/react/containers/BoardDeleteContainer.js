import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteBoard } from '../../redux/actions/boards'
import { getUserId } from '../../redux/selectors/userSelectors';

const mapStateToProps = state => {
	return {
		userId: getUserId(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteBoard: (userId, boardId) => {
			dispatch(deleteBoard(userId, boardId))
		}
	}
}

class BoardDeleteContainer extends Component {
	constructor() {
		super()

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault()

		const { boardId, userId } = this.props

		this.props.deleteBoard(userId, boardId)

		document.querySelector('body').classList.remove('modal-open')
	}

	render() {
		return (
			<form>
				<div className="form-group">
					<p>Are you sure you want to delete this board? This action cannot be undone.</p>
				</div>
				<button
					type="submit"
					onClick={this.handleSubmit}
					className="btn btn-danger"
				>
					Delete Board
         </button>
			</form>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BoardDeleteContainer)

BoardDeleteContainer.propTypes = {
	userId: PropTypes.number.isRequired,
	boardId: PropTypes.number.isRequired,
	deleteBoard: PropTypes.func.isRequired,
}