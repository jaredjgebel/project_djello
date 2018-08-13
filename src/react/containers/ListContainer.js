import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchLists } from '../../redux/actions/lists'
import List from '../components/List'
import { CardDeck, Container, } from 'reactstrap'
import ModalContainer from '../containers/ModalContainer'
import ListFormContainer from '../containers/ListFormContainer'
import array from 'lodash/array'
import { getBoardId } from '../../redux/selectors/boardSelectors';
import { areListsFetching, getLists, getListIds } from '../../redux/selectors/listSelector';

const mapStateToProps = state => {
   return {
      boardId: getBoardId(state),
      isFetching: areListsFetching(state),
      lists: getLists(state),
      listIds: getListIds(state),
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

   componentDidUpdate(prevProps) {
      const { boardId, fetchLists, listIds } = this.props
      console.log('difference', array.difference(listIds, prevProps.listIds))

      if (array.difference(listIds, prevProps.listIds).length !== 0) {
         fetchLists(boardId)
      }
   }

   render() {
      const { isFetching, listIds } = this.props

      if (isFetching) {
         return (
            <p>Retrieving list data.</p>
         )

      } else if (!isFetching && listIds === []) {
         return (
            <div>
               <p>No lists yet. Create a new one!</p>
               <ModalContainer
                  action="New List"
                  header="New List"
                  button="New List"
               >
                  <ListFormContainer />
               </ModalContainer>
            </div>
         )
         
      } else {
         const { lists } = this.props

         const listElements = []
         if (listIds && listIds.length !== 0) {
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
         }

         return (
            <div>
               <Container fluid>
                  <CardDeck>
                     {listElements === [] ? 'No lists yet. Create a new one!' : listElements}
                  </CardDeck>
               </Container>
            </div>
         )
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
   fetchLists: PropTypes.func,
}