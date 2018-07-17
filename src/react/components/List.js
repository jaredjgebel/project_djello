import React from 'react'
import PropTypes from 'prop-types'
import CardContainer from '../containers/CardContainer'

const List = ({ listId, title, description }) => {
   return (
      <div>
         <h4>{title}</h4>
         <p>{description}</p>
         <CardContainer listId={listId} />
      </div>
   )
}

export default List

List.propTypes = {
   title: PropTypes.string,
   description: PropTypes.string,
}