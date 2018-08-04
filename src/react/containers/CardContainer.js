import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from '../components/Card'
import { Button, CardBody } from 'reactstrap'
import { fetchCards } from '../../redux/actions/cards'

const mapStateToProps = state => {
   return {
      isFetching: state.cards.ui.isFetching,
      cardsById: state.cards && state.cards.byId,
      cardIds: state.cards && state.cards.allIds,
      lists: state.lists,
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
      const { isFetching, cardsById, cardIds, listId, lists } = this.props

      if (isFetching) {
         return (
            <div>
               <p>Loading cards.</p>
            </div>
         )
      }

      if (cardsById !== {}) {
         const cardElements = []

         cardIds.map(id => {
            if (lists.byId[listId].CardIds && lists.byId[listId].CardIds.includes(id)) {
               cardElements.push(
                  <CardBody key={id}>
                     <Card
                        title={cardsById[id].title}
                        description={cardsById[id].description}
                        updatedAt={cardsById[id].updatedAt}
                        cardId={id}
                     />
                  </CardBody>
               )
            }
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