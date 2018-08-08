import React from 'react'
import PropTypes from 'prop-types'

const History = ({ text, updatedAt }) => {
   const parsedDate = updatedAt.slice(0, 10)
   const parsedTime = updatedAt.slice(11, 16)
   return (
      <div>
         <ul>
            <li>{text} -- <small className="text-muted">{parsedTime} on {parsedDate}</small></li>
            {/* <ul>
               <li></li>
            </ul> */}
         </ul>
      </div>
   )
}

export default History

History.propTypes = {
   text: PropTypes.string,
   updatedAt: PropTypes.string,
}