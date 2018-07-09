import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchLists } from '../../redux/actions/lists'
import List from '../components/List'

const mapStateToProps = state => {
   return {
      boardId: state.boards.current.id,
      isFetching: state.lists.isFetching,
      lists: state.lists.current,
      listIds: state.lists.listIds,
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
   componentDidUpdate(prevProps) {
      if (this.props.boardId !== prevProps.boardId && this.props.boardId) {
         this.props.fetchLists(this.props.boardId)
      }
   }

   render() {
      const { boardId, isFetching, lists, listIds } = this.props

      if (isFetching) {
         return (
            <p>Retrieving list data.</p>
         )
      }


      if (lists !== []) {
         const listElements = []

         lists.map(list => {
            listElements.push(<List
               title={list.title}
               description={list.description}
               key={list.id}
            />)
         })

         return (
            <div>
               {lists}
            </div>
         )
      }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ListContainer)