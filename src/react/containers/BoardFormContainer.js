import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, FormGroup } from 'reactstrap'
import { createBoard, editBoard } from '../../redux/actions/boards'

const mapStateToProps = state => {
   return {
      userId: state.users && state.users.id
   }
}

const mapDispatchToProps = dispatch => {
   return {
      createBoard: (userId, title, description) => {
         dispatch(createBoard(userId, title, description))
      },
      editBoard: (boardId, title, description) => {
         dispatch(editBoard(boardId, title, description))
      }
   }
}

class BoardFormContainer extends Component {
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

   handleSubmit(event) {
      event.preventDefault()

      const { action, boardId } = this.props

      const title = this.title.current.value
      const description = this.description.current.value

      const titleFeedback = title.length < 255 ? "is-valid" : "is-invalid"
      const descriptionFeedback = description.length < 255 ? "is-valid" : "is-invalid"

      this.setState({ titleFeedback })
      this.setState({ descriptionFeedback })


      if (titleFeedback === "is-valid" && descriptionFeedback === "is-valid") {
         // check for which action to dispatch
         if (action === "New Board") {
            this.props.createBoard(this.props.userId, title, description)
         } else if (action === "Edit Board") {
            this.props.editBoard(boardId, title, description)
         } else if (action === "Delete Board") {
            // show confirmation modal
            // delete board
         } else {

         }
         // close modal ????
         // this.props.toggle()
      }
   }

   render() {
      const titleInvalidDiv = this.state.titleFeedback === "is-invalid" ? <div className="invalid-feedback">Board title must be less than 255 characters.</div> : null

      const descriptionInvalidDiv = this.state.descriptionFeedback === "is-invalid" ? <div className="invalid-feedback">Board description must be less than 255 characters.</div> : null


      return (
         <div>
            <Form>
               <FormGroup>
                  <input
                     type="text"
                     name="title"
                     id="boardTitle"
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
                     id="boardDescription"
                     placeholder="Board Description"
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
                  Submit Board
               </button>
            </Form>
         </div>
      )
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(BoardFormContainer)

BoardFormContainer.propTypes = {
   userId: PropTypes.number,
   createBoard: PropTypes.func,
}