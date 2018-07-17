import React from 'react'
import ListContainer from '../containers/ListContainer'
import ErrorBoundary from '../containers/ErrorBoundary'

const Board = ({ boardNames, current }) => {
   return (
      <div>
         {/* component to select board */}
         <h2>{current.title}</h2>
         <p>{current.description}</p>
         <ErrorBoundary>
            <ListContainer />
         </ErrorBoundary>
      </div>
   )
}


export default Board