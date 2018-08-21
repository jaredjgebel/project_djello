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
         <div className="board-menu-container container-fluid">
            {/* <div className="board-menu-background col-6 col-sm-12">
               </div> */}
            <div className="board-menu fixed-top">
               <div className="row">
                  <Col xs="12" sm="6" className="board-title">
                     <h3>{current.title}</h3>
                     <p>{current.description}</p>
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
               </div>
            </div>
         </div>
         <div className="list-container">
            <ListContainer />
         </div>
      </div>
   )
}

export default Board

Board.propTypes = {
   current: PropTypes.object,
}