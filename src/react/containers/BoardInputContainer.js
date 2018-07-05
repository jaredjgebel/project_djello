import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
   DropdownItem,
   DropdownMenu,
   DropdownToggle,
   Input,
   InputGroup,
   InputGroupButtonDropdown,
} from 'reactstrap'

class BoardInputContainer extends Component {
   constructor(props) {
      super(props)

      this.toggleDropDown = this.toggleDropDown.bind(this)

      this.state = {
         dropdownOpen: false,
      }
   }

   toggleDropDown() {
      this.setState({
         dropdownOpen: !this.state.dropdownOpen
      })
   }
   render() {
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
                  <DropdownItem>Board 1</DropdownItem>
                  <DropdownItem>Board 2</DropdownItem>
               </DropdownMenu>
            </InputGroupButtonDropdown>
         </InputGroup>
      )
   }
}

export default BoardInputContainer

InputGroup.propTypes = {
   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
   size: PropTypes.string,
   className: PropTypes.string
};