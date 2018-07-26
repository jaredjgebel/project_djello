import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, FormGroup } from 'reactstrap'
import { createCard } from '../../redux/actions/cards'

const mapDispatchToProps = dispatch => {
   return {
      createCard: (listId, title, description) => {
         dispatch(createCard(listId, title, description))
      }
   }
}

class CardFormContainer extends Component {
   constructor() {
      super()
      this.state = {
         titleFeedback: null,
         descriptionFeedback: null,
      }

      this.handleSubmit = this.handleSubmit.bind(this)
      this.title = React.createRef()
      this.description = React.createRef()
   }

   handleSubmit(e) {
      e.preventDefault()

      const title = this.title.current.value
      const description = this.description.current.value

      const titleFeedback = title.length < 255 ? "is-valid" : "is-invalid"
      const descriptionFeedback = description.length < 255 ? "is-valid" : "is-invalid"

      this.setState({ titleFeedback })
      this.setState({ descriptionFeedback })

      if (titleFeedback === "is-valid" && descriptionFeedback === "is-valid") {
         // dispatch action
         // if "mode" is edit and not create, dispatch a different action???
         this.props.createCard(this.props.listId, title, description)
         // close modal ????
         // this.props.toggle()
      }
   }

   render() {
      const titleInvalidDiv = this.state.titleFeedback === "is-invalid" ? <div className="invalid-feedback">List title must be less than 255 characters.</div> : null

      const descriptionInvalidDiv = this.state.descriptionFeedback === "is-invalid" ? <div className="invalid-feedback">List description must be less than 255 characters.</div> : null

      return (
         <Form>
            <FormGroup>
               <input
                  type="text"
                  name="title"
                  id="cardTitle"
                  placeholder="Title"
                  className={`form-control ${this.state.titleFeedback}`}
                  ref={this.title}
               />
               {titleInvalidDiv}
            </FormGroup>
            <FormGroup>
               <input
                  type="text"
                  name="description"
                  id="cardDescription"
                  placeholder="Description"
                  className={`form-control ${this.state.descriptionFeedback}`}
                  ref={this.description}
               />
               {descriptionInvalidDiv}
            </FormGroup>
            <button
               type="submit"
               onClick={this.handleSubmit}
               className="btn btn-primary"
            >
               Submit Card
               </button>
         </Form>
      )
   }
}

export default connect(
   null,
   mapDispatchToProps
)(CardFormContainer)