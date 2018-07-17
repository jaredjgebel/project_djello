import React from 'react'
import PropTypes from 'prop-types'
import ListContainer from '../containers/ListContainer'
import ErrorBoundary from '../containers/ErrorBoundary'

const Board = ({ boardNames, current }) => {
   return (
      <div>
         {/* component to select board */}
         <h2>{current.title}</h2>
         <p>{current.description}</p>
         <ListContainer />
      </div>
   )
}


export default Board

Board.propTypes = {
   current: PropTypes.object,
}