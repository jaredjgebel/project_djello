import React from 'react'
import PropTypes from 'prop-types'
import ListContainer from '../containers/ListContainer'
import BoardFormContainer from '../containers/BoardFormContainer'
import ModalContainer from '../containers/ModalContainer'
import { Container } from 'reactstrap'
import BoardInputContainer from '../containers/BoardInputContainer'
import BoardDeleteContainer from '../containers/BoardDeleteContainer'

const Board = ({ current }) => {
   if (!current) {
      return (
         <div>
            <p>Retrieving boards.</p>
         </div>
      )
   }

   return (
      <div>
         <Container fluid="true">
            <h2>{current.title}</h2>
            <p>{current.description}</p>

            <BoardInputContainer />

            <ModalContainer
               action="New Board"
               header="New Board"
            >
               <BoardFormContainer />
            </ModalContainer>

            <ModalContainer
               action="Edit Board"
               header="Edit Board"
            >
               <BoardFormContainer 
                  boardId={current.id} 
                  boardTitle={current.title}
                  boardDescription={current.description}
               />
            </ModalContainer>

            <ModalContainer
               action="Delete Board"
               header="Delete Board"
            >
               <BoardDeleteContainer boardId={current.id} />
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