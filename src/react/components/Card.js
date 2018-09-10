import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/Card.css'
import HistoryContainer from '../containers/HistoryContainer'
import AssigneesContainer from '../containers/AssigneesContainer'
import ModalContainer from '../containers/ModalContainer'
import CardFormContainer from '../containers/CardFormContainer'
import CardDeleteContainer from '../containers/CardDeleteContainer'
import LargeCheckbox from '../components/LargeCheckbox'

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
      const { cardId, title, description, updatedAt, complete, listId, editCard, user } = this.props
      const visibleHistory = this.state.visibleHistory
      const parsedDate = updatedAt.slice(0, 10)
      const parsedTime = updatedAt.slice(11, 16)

      return (
         <div>
            <div className="card container">
               <div className="card-interior">
                  <div className="row">
                     <div className="col-10">
                        <h5 className="card-title">
                           {title}
                        </h5>
                        <ul>
                           <li className="card-text">
                              {description}
                           </li>
                        </ul>
                     </div>
                     <div className="col-1 offset-1">
                        <LargeCheckbox
                           cardId={cardId}
                           title={title}
                           description={description}
                           complete={complete}
                           listId={listId}
                           user={user}
                           editCard={editCard}
                        />
                     </div>
                  </div>


                  <div className="card-details clearfix">
                     <div className="card-update float-left align-bottom">
                        <small className="text-muted" >Updated at {parsedTime} on {parsedDate}</small>
                     </div>

                     <ModalContainer
                        action="delete-card"
                        header="Delete Card"
                        button="Delete Card"
                        buttonClasses="float-right btn-secondary"
                     >
                        <CardDeleteContainer
                           cardId={cardId}
                           listId={listId}
                        />
                     </ModalContainer>


                     <ModalContainer
                        action="edit-card"
                        header="Edit Card"
                        button="Edit Card"
                        buttonClasses="float-right btn-secondary"
                     >
                        <CardFormContainer
                           cardId={cardId}
                           listId={listId}
                        />
                     </ModalContainer>

                     <button className="float-right btn btn-secondary" onClick={this.onDetailsClick}>
                        {visibleHistory ? "Hide Details" : "Show Details"}
                     </button>
                  </div>

                  {visibleHistory ?
                     <div>
                        <HistoryContainer
                           cardId={cardId}
                        />
                        <AssigneesContainer
                           cardId={cardId}
                        />
                     </div> : null
                  }
               </div>
            </div>
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
