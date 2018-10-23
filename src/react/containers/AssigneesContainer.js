import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Assignee from '../components/Assignee'
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
   render() {
      const { assigneesById, cardId, cardsById } = this.props

      const allCardAssignees = cardsById[cardId] && cardsById[cardId].AssigneeIds

      let assigneeElements = []

      if (allCardAssignees) {
         assigneeElements = allCardAssignees.map((id, i) => (
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
               header="Add or Remove Assignee To Card"
               buttonText="Add or Remove Assignee"
            >
               <AssigneesFormContainer cardId={cardId} />
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
