import React from 'react'

const App = ({ allBoards, currentBoard, error }) => {
   console.log('ERROR', error)
   return (
      <div className="app-container">
         <h2>{currentBoard.title}</h2>
         <p>{currentBoard.description}</p>
      </div>
   )
}

export default App