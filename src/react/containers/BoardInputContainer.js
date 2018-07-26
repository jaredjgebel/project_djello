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
import { switchBoards, fetchBoards } from '../../redux/actions/boards'
import { fetchLists } from '../../redux/actions/lists'

const mapStateToProps = state => {
   const boards = state.boards
   const allIds = state.boards && state.boards.allIds
   const current = state.boards && state.boards.ui && state.boards.ui.current

   const boardNames = allIds.map(id => state.boards.byId[id].title)

   return {
      allIds,
      boards,
      boardNames,
      current,
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

      const dropdownIds = allIds.filter(id => {
         if (id === current.id) {
            return false
         }

         return true
      })

      const dropdownItems = dropdownIds.map((id, i) => (
         <DropdownItem
            onClick={() => this.selectBoard(boards.byId[id])}
            key={i}
         >
            {boards.byId[id].title}
         </DropdownItem>
      ))

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

InputGroup.propTypes = {
   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
   size: PropTypes.string,
   className: PropTypes.string
};