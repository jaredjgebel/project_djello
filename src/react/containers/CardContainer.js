import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCards } from '../../redux/actions/cards'

const mapStateToProps = state => {
   return {
      isFetching: state.cards.ui.isFetching,
      cards: state.cards && state.cards.byId,
      cardIds: state.cards && state.cards.allIds,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchCards: (listId) => {
         dispatch(fetchCards(listId))
      }
   }
}

class CardContainer extends Component {
   componentDidMount() {
      this.props.fetchCards(this.props.listId)
   }

   render() {
      return (
         <div>
            <p>Cards</p>
         </div>
      )
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(CardContainer)