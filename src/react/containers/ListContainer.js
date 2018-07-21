import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchLists } from '../../redux/actions/lists'
import List from '../components/List'
import ModalContainer from '../containers/ModalContainer'
import ListFormContainer from '../containers/ListFormContainer'
import { Button, CardDeck, Container, } from 'reactstrap'

const mapStateToProps = state => {
   return {
      boardId: state.boards.ui.current && state.boards.ui.current.id,
      isFetching: state.lists.ui.isFetching,
      lists: state.lists && state.lists.byId,
      listIds: state.lists && state.lists.allIds,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchLists: (boardId) => {
         dispatch(fetchLists(boardId))
      }
   }
}

class ListContainer extends Component {
   componentDidMount() {
      if (this.props.boardId) {
         this.props.fetchLists(this.props.boardId)
      }
   }

   render() {
      const { isFetching } = this.props

      if (isFetching) {
         return (
            <p>Retrieving list data.</p>
         )
      }

      const { lists, listIds } = this.props

      if (listIds.length !== 0) {
         const listElements = []

         listIds.map(id => {
            listElements.push(
               <List
                  title={lists[id].title}
                  description={lists[id].description}
                  listId={id}
                  key={id}
               />
            )
         })

         return (
            <div>
               <Container fluid>
                  <CardDeck>
                     <ModalContainer
                        action="New Post"
                        header="New Post"
                     >
                        <ListFormContainer />
                     </ModalContainer>
                     {listElements}
                  </CardDeck>
               </Container>
            </div>
         )
      } else {
         return 'Error. Lists could not be rendered'
      }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ListContainer)

ListContainer.propTypes = {
   boardId: PropTypes.number,
   isFetching: PropTypes.bool,
   lists: PropTypes.object,
   listIds: PropTypes.array,
}