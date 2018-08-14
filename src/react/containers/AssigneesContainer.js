import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Assignee from '../components/Assignee'
import { Button } from 'reactstrap'
import '../stylesheets/Assignee.css'
import { getAllAssignees } from '../../redux/selectors/assigneeSelectors';
import { getCards } from '../../redux/selectors/cardSelectors';
import ModalContainer from '../containers/ModalContainer'
import AssigneesFormContainer from '../containers/AssigneesFormContainer'

const mapStateToProps = state => {
   return {
      assigneesById: getAllAssignees(state),
      cardsById: getCards(state),
   }
}

class AssigneeContainer extends Component {
   constructor() {
      super()
   }

   render() {
      const { assigneesById, cardId, cardsById } = this.props

      console.log('cardsById', cardsById)
      console.log('assigneesById', assigneesById)
      const allCardAssignees = cardsById[cardId] && cardsById[cardId].AssigneeIds

      let assigneeElements = []

      console.log('allCardAssignees', allCardAssignees)
      if (allCardAssignees) {
         assigneeElements = allCardAssignees.map(id => (
            <Assignee
               assignee={assigneesById[id]}
               key={id}
            />
         ))
      }

      return (
         <div>
            <h6>Assigned to Card</h6>
            <div className="assignee-elements">
               {allCardAssignees !== [] ? assigneeElements : null}
            </div>
            <ModalContainer
               header="Add Assignee To Card"
               button="Add Assignee To Card"

            >
               <AssigneesFormContainer />
               {/* <Button className="float-right">Add Assignee To Card</Button> */}
            </ModalContainer>
         </div>
      )
   }
}

export default connect(
   mapStateToProps
)(AssigneeContainer)

AssigneeContainer.propTypes = {
   assigneesById: PropTypes.object,
   cardId: PropTypes.number,
   cardsById: PropTypes.object,
}
