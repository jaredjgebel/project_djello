import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Assignee from '../components/Assignee'
import { Button } from 'reactstrap'
import '../stylesheets/Assignee.css'
import { getAllAssignees } from '../../redux/selectors/assigneeSelectors';
import { getAllCards } from '../../redux/selectors/cardSelectors';

const mapStateToProps = state => {
   return {
      assignees: getAllAssignees(state),
      cards: getAllCards(state),
   }
}

class AssigneeContainer extends Component {
   constructor() {
      super()
   }

   render() {
      const { assignees, cardId, cards } = this.props

      const allCardAssignees = cards.byId[cardId].AssigneeIds


      if (allCardAssignees === []) {
         return (
            <div>
               <p style={{ fontWeight: "bold" }}>Assigned to Card</p>
               <Button>Add Assignee To Card</Button>
            </div>
         )
      }

      const assigneeElements = allCardAssignees.map(id => (
         <Assignee
            assignee={assignees.byId[id]}
            key={id}
         />
      ))

      return (
         <div>
            <h6>Assigned to Card</h6>
            <div className="assignee-elements">
               {assigneeElements}
            </div>
            <Button className="float-right">Add Assignee To Card</Button>
         </div>
      )
   }
}

export default connect(
   mapStateToProps
)(AssigneeContainer)
