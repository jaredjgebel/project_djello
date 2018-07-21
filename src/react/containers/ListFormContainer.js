import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, FormGroup } from 'reactstrap'
import { createList } from '../../redux/actions/lists'

const mapStateToProps = state => {
   return {
      boardId: state.boards && state.boards.ui && state.boards.ui.current && state.boards.ui.current.id 
   }
}

const mapDispatchToProps = dispatch => {
   return {
      createList: (boardId, title, description) => {
         dispatch(createList(boardId, title, description))
      }
   }
}

class ListFormContainer extends Component {
   constructor() {
      super()
      this.state = {
         titleFeedback: null,
         descriptonFeedback: null,
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
         this.props.createList(this.props.boardId, title, description)
         // close modal ????
         // this.props.toggle()
      }
   }
   render() {
      const titleInvalidDiv = this.state.titleFeedback === "is-invalid" ? <div className="invalid-feedback">List title must be less than 255 characters.</div> : null
      
      const descriptionInvalidDiv = this.state.descriptionFeedback === "is-invalid" ? <div className="invalid-feedback">List description must be less than 255 characters.</div> : null

      return (
         <div>
            <Form>
               <FormGroup>
                  <input 
                     type="text"
                     name="title"
                     id="listTitle"
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
                     id="listDescription"
                     placeholder="List Description"
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
                  Submit List
               </button>
            </Form>
         </div>
      )
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ListFormContainer)