import React from 'react'
import PropTypes from 'prop-types'
import ListContainer from '../containers/ListContainer'
import BoardFormContainer from '../containers/BoardFormContainer'
import ModalContainer from '../containers/ModalContainer'
import { Button, Container } from 'reactstrap'

const Board = ({ boardNames, current }) => {
   return (
      <div>
         <Container fluid="true">
            <h2>{current.title}</h2>
            <p>{current.description}</p>

            <ModalContainer
               action="New Board"
               header="New Board"
            >
               <BoardFormContainer />
            </ModalContainer>

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