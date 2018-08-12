import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBoards } from '../../redux/actions/boards'
import Board from '../components/Board'

const mapStateToProps = state => {
   return {
      userId: state.users.id,
      current: state.boards.ui && state.boards.ui.current,
      isFetching: state.boards.ui && state.boards.ui.isFetching,
      listIds: state.lists.allIds,
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
   componentDidUpdate(prevProps) {
      if (this.props.userId !== prevProps.userId && this.props.userId) {
         this.props.fetchBoards(this.props.userId)
      }
   }

   render() {
      const { isFetching, listIds } = this.props
      console.log('listIds', listIds)
      if (isFetching) {
         return (
            <div className="board-loading">
               <p>Loading lists.</p>
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