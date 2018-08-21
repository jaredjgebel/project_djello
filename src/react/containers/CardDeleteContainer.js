import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteCard } from '../../redux/actions/cards'

const mapDispatchToProps = dispatch => {
   return {
      deleteCard: (listId, cardId) => {
         dispatch(deleteCard(listId, cardId))
      }
   }
}

class CardDeleteContainer extends Component {
   constructor() {
      super()
      this.handleSubmit = this.handleSubmit.bind(this)
   }

   handleSubmit(e) {
      e.preventDefault()

      const { listId, cardId } = this.props

      this.props.deleteCard(listId, cardId)
   }

   render() {
      return (
         <form>
            <div className="form-group">
               <p>Are you sure you want to delete this card? This action cannot be undone.</p>
            </div>
            <button
               type="submit"
               onClick={this.handleSubmit}
               className="btn btn-danger"
            >
               Delete Card
      </button>
         </form>
      )
   }
}

export default connect(
   null,
   mapDispatchToProps
)(CardDeleteContainer)

CardDeleteContainer.propTypes = {
   cardId: PropTypes.number,
   listId: PropTypes.number,
}