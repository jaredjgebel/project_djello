import React from 'react'
import PropTypes from 'prop-types'
import CardContainer from '../containers/CardContainer'
import ModalContainer from '../containers/ModalContainer'
import ListFormContainer from '../containers/ListFormContainer'
import CardFormContainer from '../containers/CardFormContainer'
import ListDeleteContainer from '../containers/ListDeleteContainer'
import '../stylesheets/List.css'

const List = ({ listId, title, description }) => {
   return (
      <div className="list col-12 col-lg-6">
         <div className="card">
            <div className="card-header">
               <h4>{title}</h4>
               <div className="card-subtitle" style={{ fontWeight: 'normal' }}>{description}</div>

               <div className="clearfix">
                  <div className="btn-group float-right" role="group">
                     <ModalContainer
                        action="New List"
                        header="New List"
                        button="New"
                     >
                        <ListFormContainer />
                     </ModalContainer>

                     <ModalContainer
                        action="Edit List"
                        header="Edit List"
                        button="Edit"
                     >
                        <ListFormContainer listId={listId} />
                     </ModalContainer>

                     <ModalContainer
                        action="Delete List"
                        header="Delete List"
                        button="Delete"
                     >
                        <ListDeleteContainer listId={listId} />
                     </ModalContainer>

                     <button className="btn btn-secondary float-left">Lists</button>
                  </div>
                  <ModalContainer
                     action="New Card"
                     header="New Card"
                     button="New Card"
                  >
                     <CardFormContainer listId={listId} />
                  </ModalContainer>
               </div>
            </div>
            <CardContainer listId={listId} />
         </div>
      </div>
   )
}

export default List

List.propTypes = {
   listId: PropTypes.number,
   title: PropTypes.string,
   description: PropTypes.string,
}