import React from 'react'
import PropTypes from 'prop-types'
import CardContainer from '../containers/CardContainer'
import ModalContainer from '../containers/ModalContainer'
import CardFormContainer from '../containers/CardFormContainer'
import { Card, CardSubtitle, CardHeader, CardFooter, Button, Col } from 'reactstrap';

const List = ({ listId, title, description }) => {
   return (
      <Col xs="12" lg="6">
         <Card outline>
            <CardHeader>
               <h4>{title}</h4>
               <CardSubtitle tag="p" style={{ fontWeight: 'normal' }}>{description}</CardSubtitle>
            </CardHeader>
            <CardContainer listId={listId} />
            <CardFooter>
               <ModalContainer
                  action="New Card"
                  header="New Card"
               >
                  <CardFormContainer listId={listId} />
               </ModalContainer>
            </CardFooter>
         </Card>
      </Col>
   )
}

export default List

List.propTypes = {
   title: PropTypes.string,
   description: PropTypes.string,
}