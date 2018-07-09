import React from 'react'
import PropTypes from 'prop-types'

const List = ({ title, description }) => {
   return (
      <div>
         <h4>{title}</h4>
         <p>{description}</p>
      </div>
   )
}

export default List