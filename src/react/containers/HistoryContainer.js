import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchHistories } from '../../redux/actions/histories'
import History from '../components/History'
import { areHistoriesFetching, getHistories, getHistoryIds } from '../../redux/selectors/historySelectors'
import { getCards } from '../../redux/selectors/cardSelectors';

const mapStateToProps = state => {
   return {
      isFetching: areHistoriesFetching(state),
      histories: getHistories(state),
      historyIds: getHistoryIds(state),
      cardsById: getCards(state),
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
            if (cardsById[cardId].HistoryIds && cardsById[cardId].HistoryIds.includes(id)) {
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
               <h6>History</h6>
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
   fetchHistories: PropTypes.func,
}