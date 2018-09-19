import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Board from '../components/Board'
import { fetchBoards } from '../../redux/actions/boards'
import { getUserId } from '../../redux/selectors/userSelectors'
import { getCurrentBoard, isBoardFetching } from '../../redux/selectors/boardSelectors';
import BoardInputContainer from './BoardInputContainer';

const mapStateToProps = state => {
   return {
      userId: getUserId(state),
      current: getCurrentBoard(state),
      isFetching: isBoardFetching(state),
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchBoards: (userId) => {
         dispatch(fetchBoards(userId))
      },
   }
}

class BoardContainer extends Component {
   render() {
      const { isFetching } = this.props

      if (isFetching) {
         return (
            <div className="board-loading">
               <p>Loading boards.</p>
            </div>
         )
      }

      const { current } = this.props

      return (
         <div>
            <Board
               current={current}
            />
         </div>
      )
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(BoardContainer)

BoardContainer.propTypes = {
   userId: PropTypes.number,
   current: PropTypes.object,
   isFetching: PropTypes.bool,
}