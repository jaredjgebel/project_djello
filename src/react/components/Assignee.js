import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/Assignee.css'

const Assignee = ({ assignee }) => {
   return (
      <div className="assignee">
         <img src={assignee.photo} className="assignee-photo" style={{ height: "75px", width: "75px" }} />
         <p>{assignee.first}</p>
         <p>{assignee.last}</p>

      </div>
   )
}

export default Assignee

Assignee.propTypes = {
   assignee: PropTypes.object
}

