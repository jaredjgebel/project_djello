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
      <div className="list col-12 col-xl-6">
         <div className="card">
            <div className="card-header">
               <h4>{title}</h4>
               <div className="card-subtitle">{description}</div>
               <div className="clearfix">
                  <div className="btn-group float-right" role="group">
                     <button className="btn btn-disabled float-left">Lists</button>
                     <ModalContainer
                        action="new-list"
                        header="New List"
                        button="New"
                     >
                        <ListFormContainer />
                     </ModalContainer>

                     <ModalContainer
                        action="edit-list"
                        header="Edit List"
                        button="Edit"
                     >
                        <ListFormContainer 
                           listId={listId}
                           title={title}
                           description={description}
                        />
                     </ModalContainer>

                     <ModalContainer
                        action="delete-list"
                        header="Delete List"
                        button="Delete"
                     >
                        <ListDeleteContainer listId={listId} />
                     </ModalContainer>
                  </div>
                  <ModalContainer
                     action="new-card"
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