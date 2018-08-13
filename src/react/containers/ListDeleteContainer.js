import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, FormGroup } from 'reactstrap'
import { deleteList } from '../../redux/actions/lists'
import { getBoardId } from '../../redux/selectors/boardSelectors';

const mapStateToProps = state => {
	return {
		boardId: getBoardId(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteList: (boardId, listId) => {
			dispatch(deleteList(boardId, listId))
		}
	}
}

class ListDeleteContainer extends Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e) {
		e.preventDefault()

		const { boardId, listId } = this.props

		this.props.deleteList(boardId, listId)
		// close modal
	}

	render() {
		return (
			<Form>
				<FormGroup>
					<p>Are you sure you want to delete this list? This action cannot be undone.</p>
				</FormGroup>
				<button
					type="submit"
					onClick={this.handleSubmit}
					className="btn btn-danger"
				>
					Delete List
         </button>
			</Form>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListDeleteContainer)

ListDeleteContainer.propTypes = {
	boardId: PropTypes.number.isRequired,
	listId: PropTypes.number.isRequired,
	deleteList: PropTypes.func.isRequired,
}