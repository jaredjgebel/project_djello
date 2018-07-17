import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchLists } from '../../redux/actions/lists'
import List from '../components/List'

const mapStateToProps = state => {
   return {
      boardId: state.boards.ui.current && state.boards.ui.current.id,
      isFetching: state.lists.ui.isFetching,
      lists: state.lists && state.lists.byId,
      listIds: state.lists && state.lists.allIds && state.lists.allIds,
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
                  key={id}
               />
            )
         })

         return (
            <div>
               {listElements}
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