import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CardText, Card as RsCard, Button, } from 'reactstrap'
import '../stylesheets/Card.css'
import HistoryContainer from '../containers/HistoryContainer'
import AssigneesContainer from '../containers/AssigneesContainer'

class Card extends Component {
   constructor() {
      super()
      this.state = { visibleHistory: false }
      this.onDetailsClick = this.onDetailsClick.bind(this);
   }

   onDetailsClick = () => {
      this.setState(prevState => ({
         visibleHistory: !prevState.visibleHistory
      }))
   }

   render() {
      const { cardId, title, description, updatedAt } = this.props
      const visibleHistory = this.state.visibleHistory

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
                  <Button className="float-right" onClick={this.onDetailsClick}>Show Details</Button>
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