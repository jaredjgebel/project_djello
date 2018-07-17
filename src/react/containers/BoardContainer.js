import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBoards } from '../../redux/actions/boards'
import Board from '../components/Board'
import ErrorBoundary from '../containers/ErrorBoundary'

const mapStateToProps = state => {
   const boards = {
      ...state.boards.byId,
   }
   const boardNames = boards !== {} ? Object.keys(boards).map(key => boards[key].title) : []

   return {
      userId: state.users.id,
      boardNames,
      current: state.boards.ui.current,
      isFetching: state.boards.ui.isFetching,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchBoards: (userId) => {
         dispatch(fetchBoards(userId))
      }
   }
}

class BoardContainer extends Component {
   componentDidUpdate(prevProps) {
      if (this.props.userId !== prevProps.userId && this.props.userId) {
         this.props.fetchBoards(this.props.userId)
      }
   }

   render() {
      const { isFetching } = this.props
      if (isFetching) {
         return (
            <div>
               <p>Loading boards.</p>
            </div>
         )
      } else {
         const { boardNames, current, isFetching } = this.props
         return (
            <div>
               <Board
                  boardNames={boardNames}
                  current={current}
               />
            </div>
         )
      }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(BoardContainer)

BoardContainer.propTypes = {
   userId: PropTypes.number,
   boardNames: PropTypes.array,
   current: PropTypes.object,
   isFetching: PropTypes.bool,
}