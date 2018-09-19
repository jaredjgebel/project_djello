import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBoard, editBoard } from '../../redux/actions/boards'
import { getUserId } from '../../redux/selectors/userSelectors'

const mapStateToProps = state => {
   return {
      userId: getUserId(state)
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

      const { action, boardId, userId, createBoard, editBoard } = this.props

      const title = this.title.current.value
      const description = this.description.current.value

      const titleFeedback = title.length < 255 ? "is-valid" : "is-invalid"
      const descriptionFeedback = description.length < 255 ? "is-valid" : "is-invalid"

      this.setState({ titleFeedback })
      this.setState({ descriptionFeedback })

      if (titleFeedback === "is-valid" && descriptionFeedback === "is-valid") {
         // check for which action to dispatch
         if (action === "new-board") {
            createBoard(userId, title, description)
         } else if (action === "edit-board") {
            editBoard(boardId, title, description)
         }
      }

      document.querySelector('body').classList.remove('modal-open')
   }

   render() {
      const { boardTitle, boardDescription, action } = this.props
      const { titleFeedback, descriptionFeedback } = this.state

      const titleInvalidDiv = titleFeedback === "is-invalid" ? <div className="invalid-feedback">Board title must be less than 255 characters.</div> : null

      const descriptionInvalidDiv = descriptionFeedback === "is-invalid" ? <div className="invalid-feedback">Board description must be less than 255 characters.</div> : null

      const titlePlaceholder = action === "new-board" ? "Title" : null
      const descriptionPlaceholder = action === "new-board" ? "Description" : null

      const titleValue = action === "new-board" ? null : boardTitle
      const descriptionValue = action === "new-board" ? null : boardDescription

      return (
         <div>
            <form>
               <div className="form-group">
                  <input
                     type="text"
                     name="title"
                     id="boardTitle"
                     placeholder={titlePlaceholder}
                     defaultValue={titleValue}
                     className={`form-control ${titleFeedback}`}
                     ref={this.title}
                  />
                  {titleInvalidDiv}
               </div>
               <div className="form-group">
                  <input
                     type="text"
                     name="description"
                     id="boardDescription"
                     placeholder={descriptionPlaceholder}
                     defaultValue={descriptionValue}
                     className={`form-control ${descriptionFeedback}`}
                     ref={this.description}
                  />
                  {descriptionInvalidDiv}
               </div>
               <button
                  type="submit"
                  onClick={this.handleSubmit}
                  className="btn btn-primary"
               >
                  Submit Board
               </button>
            </form>
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
   createBoard: PropTypes.func.isRequired,
   editBoard: PropTypes.func.isRequired,
}