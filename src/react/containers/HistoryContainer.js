import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchHistories } from '../../redux/actions/histories'
import History from '../components/History'

const mapStateToProps = state => {
   return {
      isFetching: state.histories.ui.isFetching,
      histories: state.histories && state.histories.byId,
      historyIds: state.histories && state.histories.allIds,
      cardsById: state.cards && state.cards.byId,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchHistories: (cardId) => {
         dispatch(fetchHistories(cardId))
      }
   }
}

class HistoryContainer extends Component {
   componentDidMount() {
      this.props.fetchHistories(this.props.cardId)
   }

   render() {
      const { cardId, cardsById, isFetching, histories, historyIds } = this.props

      if (isFetching) {
         return (
            <div>
               <p>Loading histories.</p>
            </div>
         )
      }

      if (histories !== {}) {
         const historyElements = []

         historyIds.map(id => {
            if (cardsById[cardId].HistoryIds.includes(id)) {
               historyElements.push(
                  <History
                     text={histories[id].text}
                     updatedAt={histories[id].updatedAt}
                     key={id}
                  />
               )
            }
         })

         return (
            <div>
               {historyElements}
            </div>
         )
      } else {
         return (
            <div>
               <p>No current histories.</p>
            </div>
         )
      }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(HistoryContainer)

HistoryContainer.propTypes = {
   cardId: PropTypes.number,
   isFetching: PropTypes.bool,
   histories: PropTypes.object,
   historyIds: PropTypes.array,
}