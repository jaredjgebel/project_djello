import React from 'react'
import PropTypes from 'prop-types'
import ListContainer from '../containers/ListContainer'
import BoardFormContainer from '../containers/BoardFormContainer'
import ModalContainer from '../containers/ModalContainer'
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
            <div className="board-menu fixed-top">
               <div className="row">
                  <div className="board-title col-12 col-sm-6">
                     <h3>{current.title}</h3>
                     <p>{current.description}</p>
                  </div>
                  <div className="board-control col-12 col-sm-6">
                     <div className="clearfix">
                        <div
                           className="btn-group float-right"
                           role="group"
                        >
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
                        </div>
                     </div>
                  </div>
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
   current: PropTypes.object.isRequired,
}