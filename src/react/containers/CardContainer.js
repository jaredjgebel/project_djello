import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCards } from '../../redux/actions/cards'
import Card from '../components/Card'

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
      const { isFetching, cards, cardIds } = this.props

      if (isFetching) {
         return (
            <div>
               <p>Loading cards.</p>
            </div>
         )
      }

      if (cards !== {}) {
         const cardElements = []

         cardIds.map(id => {
            cardElements.push(
               <Card
                  title={cards[id].title}
                  description={cards[id].description}
                  updatedAt={cards[id].updatedAt}
                  cardId={id}
                  key={id}
               />
            )
         })

         return (
            <div>
               {cardElements}
            </div>
         )
      }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(CardContainer)

CardContainer.propTypes = {
   listId: PropTypes.number,
   isFetching: PropTypes.bool,
   cards: PropTypes.object,
   cardIds: PropTypes.array,
}