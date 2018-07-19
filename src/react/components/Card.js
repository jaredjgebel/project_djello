import React from 'react'
import PropTypes from 'prop-types'
import { CardText, Col, Card as RsCard, CardBody, Button, Row } from 'reactstrap'
import '../stylesheets/Card.css'
import HistoryContainer from '../containers/HistoryContainer'
import AssigneesContainer from '../containers/AssigneesContainer'

const Card = ({ cardId, title, description, updatedAt, visibleHistory, onDetailsClick }) => {
   return (
      <div>
         <RsCard>
            <ul>
               <li><CardText>{title}</CardText></li>
               <ul>
                  <li>
                     <CardText>{description}</CardText>
                  </li>
               </ul>
            </ul>

            <div className="card-details clearfix">
               <small className="card-update text-muted float-left align-bottom">
                  Updated at {updatedAt}
               </small>
               <Button className="float-right" onClick={onDetailsClick}>Show Details</Button>
            </div>

            <AssigneesContainer
               cardId={cardId}
            />

            {visibleHistory && <HistoryContainer
               cardId={cardId}
            />
            }
         </RsCard>

      </div>
   )
}

export default Card

Card.propTypes = {
   assignees: PropTypes.object,
   title: PropTypes.string,
   description: PropTypes.string,
   updatedAt: PropTypes.string,
   visibleHistory: PropTypes.bool,
   onDetailsClick: PropTypes.func,
}