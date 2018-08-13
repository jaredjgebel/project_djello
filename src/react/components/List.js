import React from 'react'
import PropTypes from 'prop-types'
import CardContainer from '../containers/CardContainer'
import ModalContainer from '../containers/ModalContainer'
import ListFormContainer from '../containers/ListFormContainer'
import CardFormContainer from '../containers/CardFormContainer'
import ListDeleteContainer from '../containers/ListDeleteContainer'
import { Card, CardSubtitle, CardHeader, CardFooter, Button, ButtonGroup, Col } from 'reactstrap';
import '../stylesheets/List.css'

const List = ({ listId, title, description }) => {
   return (
      <Col xs="12" lg="6" className="list">
         <Card outline>
            <CardHeader>
               <h4>{title}</h4>
               <CardSubtitle tag="p" style={{ fontWeight: 'normal' }}>{description}</CardSubtitle>

               <div className="clearfix">

                  <ButtonGroup className="float-right">
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
                  </ButtonGroup>
                  <ModalContainer
                     action="New Card"
                     header="New Card"
                     button="New Card"
                  >
                     <CardFormContainer listId={listId} />
                  </ModalContainer>
               </div>
            </CardHeader>
            <CardContainer listId={listId} />
         </Card>
      </Col>
   )
}

export default List

List.propTypes = {
   listId: PropTypes.number,
   title: PropTypes.string,
   description: PropTypes.string,
}