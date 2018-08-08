import React from 'react'
import PropTypes from 'prop-types'
import ListContainer from '../containers/ListContainer'
import BoardFormContainer from '../containers/BoardFormContainer'
import ModalContainer from '../containers/ModalContainer'
import { ButtonGroup, Container, Col, Row } from 'reactstrap'
import BoardInputContainer from '../containers/BoardInputContainer'
import BoardDeleteContainer from '../containers/BoardDeleteContainer'
import '../stylesheets/Board.css'

const Board = ({ current }) => {
   if (!current) {
      return (
         <div className="board-loading">
            <p>Retrieving boards.</p>
         </div>
      )
   }

   return (
      <div className="board">
         <Container fluid="true">
            <div className="board-menu-container">
               <div className="board-menu-background">
               </div>
               <Row className="board-menu">
                  <Col xs="12" sm="6">
                     <div className="board-title">
                        <h3>{current.title}</h3>
                        <p>{current.description}</p>
                     </div>
                  </Col>
                  <Col xs="12" sm="6" className="board-control">
                     <div className="clearfix">
                        <ButtonGroup className="float-right">
                           <ModalContainer
                              action="New Board"
                              header="New Board"
                              button="New"
                           >
                              <BoardFormContainer />
                           </ModalContainer>

                           <ModalContainer
                              action="Edit Board"
                              header="Edit Board"
                              button="Edit"
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
                              button="Delete"
                           >
                              <BoardDeleteContainer boardId={current.id} />
                           </ModalContainer>

                           <BoardInputContainer />
                        </ButtonGroup>
                     </div>
                  </Col>
               </Row>
            </div>
            <Row xs="12">
               <Container fluid>
                  <div className="list-container">
                     <ListContainer />
                  </div>
               </Container>
            </Row>

         </Container>
      </div>
   )
}

export default Board

Board.propTypes = {
   current: PropTypes.object,
}