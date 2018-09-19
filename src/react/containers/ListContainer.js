import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchLists } from '../../redux/actions/lists'
import List from '../components/List'
import ModalContainer from '../containers/ModalContainer'
import ListFormContainer from '../containers/ListFormContainer'
import array from 'lodash/array'
import { getBoardId } from '../../redux/selectors/boardSelectors';
import { areListsFetching, getLists, getVisibleListIds } from '../../redux/selectors/listSelector';

const mapStateToProps = state => {
   return {
      boardId: getBoardId(state),
      isFetching: areListsFetching(state),
      lists: getLists(state),
      // note listIds variable here contains the 
      // list ids only for the given board
      listIds: getVisibleListIds(state),
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
      const { boardId, fetchLists } = this.props
      if (boardId) {
         fetchLists(boardId)
      }
   }

   componentDidUpdate(prevProps) {
      const { boardId, fetchLists, listIds } = this.props

      if (array.difference(listIds, prevProps.listIds).length !== 0) {
         fetchLists(boardId)
      }
   }

   render() {
      const { isFetching, listIds, boardId, lists } = this.props

      if (isFetching || !boardId || lists === {}) {
         return (
            <div className="container">
               <p>Retrieving list data.</p>
            </div>
         )

      } else if (!isFetching && !listIds) {
         return (
            <div className="container">
               <p>No lists yet. Create a new one!</p>
               <ModalContainer
                  action="new-list"
                  header="New List"
                  button="New List"
               >
                  <ListFormContainer />
               </ModalContainer>
            </div>
         )

      } else {
         const { lists, listIds } = this.props
         let listElements = []

         if (listIds && listIds.length !== 0) {
            listElements = listIds.map(id => {
               if (!lists[id]) {
                  return null
               } else {
                  return <List
                     title={lists[id].title}
                     description={lists[id].description}
                     listId={id}
                     key={id}
                  />
               }
            });

            array.compact(listElements);
         }

         return (
            <div>
               <div className="container-fluid">
                  <div className="card-deck">
                     {listElements === [] ? 'No lists yet. Create a new one!' : listElements}
                  </div>
               </div>
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