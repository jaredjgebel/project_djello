import React from 'react'
import PropTypes from 'prop-types'

const Assignee = ({ assignee }) => {
   return (
      <div>
         <img src={assignee.photo} className="assignee-photo" />
         <p>{assignee.first}</p>
         <p>{assignee.last}</p>

      </div>
   )
}

export default Assignee