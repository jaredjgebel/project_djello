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
import BoardInput from '../components/BoardInput'

const mapStateToProps = state => {
   const allIds = state.boards.allIds

   const boardNames = allIds.map(id => state.boards.byId[id].title)

   return {
      boardNames,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      switchBoards: (name) => {
         dispatch(switchBoards(name))
      }
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

   selectBoard(name) {
      this.props.switchBoards(name)
   }

   toggleDropDown() {
      this.setState({
         dropdownOpen: !this.state.dropdownOpen
      })
   }
   render() {
      const { boardNames } = this.props

      const dropdownItems = boardNames.map((name, i) => (
         <DropdownItem
            onSelect={() => this.selectBoard(name)}
            key={i}
         >
            {name}
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