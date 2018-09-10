import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { switchBoards } from '../../redux/actions/boards'
import { fetchLists } from '../../redux/actions/lists'
import { getCurrentBoard, getAllBoards, getAllBoardIds, getBoardsById, getBoardNames } from '../../redux/selectors/boardSelectors';

const mapStateToProps = state => {
   return {
      allIds: getAllBoardIds(state),
      boardNames: getBoardNames(state),
      current: getCurrentBoard(state),
      boardsById: getBoardsById(state),
      boards: getAllBoards(state),
   }
}

const mapDispatchToProps = dispatch => {
   return {
      switchBoards: (name) => {
         dispatch(switchBoards(name))
      },
      fetchLists: (boardId) => {
         dispatch(fetchLists(boardId))
      },
   }
}

class BoardInputContainer extends Component {
   constructor(props) {
      super(props)

      this.selectBoard = this.selectBoard.bind(this)
   }

   selectBoard(board) {
      this.props.switchBoards(board)
      this.props.fetchLists(board.id)
   }

   render() {
      const { allIds, boards, current } = this.props

      if (current === null) {
         return null
      }

      const dropdownIds = allIds.filter(id => {
         if (id === current.id || !id) {
            return false
         }

         return true
      })

      const dropdownItems = dropdownIds.map((id, i) => {
         return (
            <button
               type="button"
               className="dropdown-item"
               onClick={() => this.selectBoard(boards.byId[id])}
               key={i}
            >
               {boards.byId[id].title}
            </button>
         )
      }
      )

      return (
         <div className="btn-group">
            <button type="button" className="btn btn-secondary">Select Board</button>
            <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <span className="sr-only">Toggle Dropdown</span>
            </button>

            <div className="dropdown-menu">
               {dropdownItems}
            </div>
         </div>
      )
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(BoardInputContainer)

BoardInputContainer.propTypes = {
   boards: PropTypes.object,
   allIds: PropTypes.array,
   current: PropTypes.object,
   byId: PropTypes.object,
   boardNames: PropTypes.array,
}
