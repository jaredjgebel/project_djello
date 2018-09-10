import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from '../components/Card'
import { fetchCards, editCard } from '../../redux/actions/cards'
import { areCardsFetching, getCards, getCardIds } from '../../redux/selectors/cardSelectors';
import { getLists } from '../../redux/selectors/listSelector'
import { getUser } from '../../redux/selectors/userSelectors'

const mapStateToProps = state => {
   return {
      isFetching: areCardsFetching(state),
      cardsById: getCards(state),
      cardIds: getCardIds(state),
      lists: getLists(state),
      user: getUser(state),
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchCards: (listId) => {
         dispatch(fetchCards(listId))
      },
      editCard: (cardId, listId, user, title, description, complete) => {
         dispatch(editCard(cardId, listId, user, title, description, complete))
      }
   }
}

class CardContainer extends Component {
   componentDidMount() {
      this.props.fetchCards(this.props.listId)
   }

   render() {
      const { editCard, isFetching, cardsById, cardIds, listId, lists, user } = this.props

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
            if (lists[listId].CardIds && lists[listId].CardIds.includes(id)) {
               cardElements.push(
                  <div key={id} className="card-body">
                     <Card
                        title={cardsById[id].title}
                        description={cardsById[id].description}
                        updatedAt={cardsById[id].updatedAt}
                        complete={cardsById[id].complete}
                        cardId={id}
                        listId={listId}
                        editCard={editCard}
                        user={user}
                     />
                  </div>
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