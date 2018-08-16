import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/HoverBorder.css'

class HoverBorder extends Component {
   constructor(props) {
      super(props)
      this.state = {
         border: "",
         selected: props.selected,
      }

      this.addInsetBorder = this.addInsetBorder.bind(this)
      this.handleMouseOver = this.handleMouseOver.bind(this)
      this.handleMouseOut = this.handleMouseOut.bind(this)
      this.handleMouseClick = this.handleMouseClick.bind(this)
   }

   componentDidMount() {
      const { selected } = this.state

      if (selected) {
         this.setState({ border: "border border-success rounded" })
      }
   }

   // actually base condition on selected, 
   // and then set selected
   handleMouseClick() {
      const { selected } = this.state

      if (selected) {
         this.setState({ selected: false, border: "" })
      }

      if (!selected) {
         this.setState({ selected: true, border: "border border-success rounded" })
      }
   }

   handleMouseOver() {
      const { selected } = this.state

      if (selected) {
         this.setState({ border: "border border-danger rounded" })
      }

      if (!selected) {
         this.setState({ border: "border border-success rounded" })
      }
   }

   handleMouseOut() {
      const { selected } = this.state
      if (selected) {
         this.setState({ border: "border border-success rounded" })
      }

      if (!selected) {
         this.setState({ border: "" })
      }
   }

   // add a brief inset border on click
   // to give more of a button feel
   addInsetBorder() {
      this.setState({ border: "border-inset rounded" })
   }

   render() {
      const { children } = this.props

      return (
         <div className="container">
            <div className="row">
               <div
                  className={`assignee-border ${this.state.border} offset-4 col-4`}
                  onClick={this.handleMouseClick}
                  onMouseDown={this.addInsetBorder}
                  onMouseOver={this.handleMouseOver}
                  onMouseOut={this.handleMouseOut}
               >
                  {children}
               </div>

            </div>

         </div>
      )
   }
}

export default HoverBorder