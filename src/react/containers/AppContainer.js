import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBoards } from '../../redux/actions'
import App from '../components/App'

const mapStateToProps = state => {
   console.log('STATE', state)
   return {
      allBoards: state.allUserBoards,
      currentBoard: state.current,
      error: state.error,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchBoards: (userId) => {
         dispatch(fetchBoards(userId))
      }
   }
}

class AppContainer extends Component {
   componentDidMount() {
      this.props.fetchBoards(33)
   }

   render() {
      const { allBoards, currentBoard, error } = this.props

      return <App
         allBoards={allBoards}
         currentBoard={currentBoard}
         error={error}
      />
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(AppContainer)