import React from 'react'
import PropTypes from 'prop-types'

const History = ({ text, updatedAt }) => {
   return (
      <div>
         <p>{text}</p>
         <p>{updatedAt}</p>
      </div>
   )
}

export default History

History.propTypes = {
   text: PropTypes.string,
   updatedAt: PropTypes.string,
}