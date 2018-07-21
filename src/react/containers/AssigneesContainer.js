import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Assignee from '../components/Assignee'
import { Button } from 'reactstrap'

const mapStateToProps = state => {
   return {
      assignees: state.assignees,
      cards: state.cards,
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
            <p style={{ fontWeight: "bold" }}>Assigned to Card</p>
            {assigneeElements}
            <Button>Add Assignee To Card</Button>
         </div>
      )
   }
}

export default connect(
   mapStateToProps
)(AssigneeContainer)
