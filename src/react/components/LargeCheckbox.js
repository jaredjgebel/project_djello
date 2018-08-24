import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/LargeCheckbox.css'

const LargeCheckbox = ({ complete, toggleCheck, cardId }) => {
   const checked = complete ? "selected" : ""

   return (
      <div className="custom-control form-control-lg custom-checkbox">
         <input type="checkbox" className="custom-control-input" id={`i${cardId}`} onChange={toggleCheck} />
         <label className="custom-control-label active" htmlFor={`i${cardId}`}  ></label>
      </div>
   )
}

export default LargeCheckbox

LargeCheckbox.propTypes = {
   complete: PropTypes.bool,
   toggleCheck: PropTypes.func,
   cardId: PropTypes.number,
}