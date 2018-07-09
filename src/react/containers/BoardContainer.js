import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBoards } from '../../redux/actions/boards'
import Board from '../components/Board'

const mapStateToProps = state => {
   return {
      userId: state.users.id,
      allUserBoards: state.boards.allUserBoards,
      current: state.boards.current,
      isFetching: state.boards.isFetching,
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
      const { allUserBoards, current, isFetching } = this.props
      if (isFetching) {
         return (
            <div>
               <p>Loading boards.</p>
            </div>
         )
      } else {
         return (
            <div>
               <Board
                  allUserBoards={allUserBoards}
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