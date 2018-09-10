import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/LargeCheckbox.css'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { Checkbox, Label } from '@zendeskgarden/react-checkboxes'

class LargeCheckbox extends Component {
   constructor(props) {
      super(props)
      this.state = { isChecked: props.complete }
      this.onChange = this.onChange.bind(this)
   }

   onChange = () => {
      const { cardId, title, description, user, listId, editCard } = this.props

      // callback ensures editCard waits for isChecked state to change
      this.setState({ isChecked: !this.state.isChecked }, () => {
         editCard(cardId, listId, user, title, description, this.state.isChecked)
         console.log(this.state.isChecked)
      })
   }

   render() {
      return (
         <ThemeProvider>
            <Checkbox
               checked={this.state.isChecked}
               onChange={this.onChange}
            >
               <Label></Label>
            </Checkbox>
         </ThemeProvider>
      )
   }
}

export default LargeCheckbox

LargeCheckbox.propTypes = {
   cardId: PropTypes.number,
   title: PropTypes.string,
   description: PropTypes.string,
   complete: PropTypes.bool,
   editCard: PropTypes.func,
   cardId: PropTypes.number,
}