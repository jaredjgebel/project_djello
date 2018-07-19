import React from 'react'
import PropTypes from 'prop-types'
import ListContainer from '../containers/ListContainer'
import BoardInputContainer from '../containers/BoardInputContainer'
import { Button, Container } from 'reactstrap'

const Board = ({ boardNames, current }) => {
   return (
      <div>
         <Container fluid="true">
            {/* <BoardInputContainer /> */}
            <h2>{current.title}</h2>
            <p>{current.description}</p>
            <Button>New Board</Button>
            <ListContainer />

         </Container>
      </div>
   )
}

export default Board

Board.propTypes = {
   current: PropTypes.object,
}

Container.propTypes = {
   fluid: PropTypes.string,
}