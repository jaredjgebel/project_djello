import React from 'react'
import ListContainer from '../containers/ListContainer'

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