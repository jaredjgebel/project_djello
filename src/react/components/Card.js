import React from 'react'
import PropTypes from 'prop-types'
import HistoryContainer from '../containers/HistoryContainer'

const Card = ({ cardId, title, description, updatedAt }) => {
   return (
      <div>
         <h6>{title}</h6>
         <p>{description}</p>
         <p>{updatedAt}</p>
         <HistoryContainer
            cardId={cardId}
         />
      </div>
   )
}

export default Card

Card.propTypes = {
   title: PropTypes.string,
   description: PropTypes.string,
   updatedAt: PropTypes.string,
}