import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
   DropdownItem,
   DropdownMenu,
   DropdownToggle,
   InputGroup,
   InputGroupButtonDropdown,
} from 'reactstrap'
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
      this.toggleDropDown = this.toggleDropDown.bind(this)

      this.state = {
         dropdownOpen: false,
      }
   }

   selectBoard(board) {
      this.props.switchBoards(board)
      this.props.fetchLists(board.id)
   }

   toggleDropDown() {
      this.setState({
         dropdownOpen: !this.state.dropdownOpen
      })
   }
   render() {
      const { allIds, boards, current } = this.props
      // console.log('boards', boards)

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
         // console.log('id', id)
         return (
            <DropdownItem
               onClick={() => this.selectBoard(boards.byId[id])}
               key={i}
            >
               {boards.byId[id].title}
            </DropdownItem>
         )
      }
      )

      return (
         <InputGroup>
            <InputGroupButtonDropdown
               addonType="append"
               isOpen={this.state.dropdownOpen}
               toggle={this.toggleDropDown}>

               <DropdownToggle caret>
                  Select Board
               </DropdownToggle>

               <DropdownMenu>
                  {dropdownItems}
               </DropdownMenu>

            </InputGroupButtonDropdown>
         </InputGroup>
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

InputGroup.propTypes = {
   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
   size: PropTypes.string,
   className: PropTypes.string
}