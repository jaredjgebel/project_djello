import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BoardContainer from '../containers/BoardContainer'
import Callback from './Callback'
import history from '../../history/history'
import LoginControl from '../containers/LoginControl'
import { fetchUser } from '../../redux/actions/user'

const mapStateToProps = state => {
   return {
      fetchingUserId: state.users.isFetchingId,
      userId: state.users.id,
   }
}


const mapDispatchToProps = dispatch => {
   return {
      fetchUser: (userId) => {
         dispatch(fetchUser(userId))
      },
   }
}

class App extends Component {
   componentDidUpdate(prevProps) {
      // change this
      if (this.props.userId !== prevProps.userId) {
         if (!this.props.fetchingUserId && this.props.userId) {
            this.props.fetchUser(this.props.userId)
         }
      }
   }

   render() {
      const { auth, handleAuthentication } = this.props
      return (
         <div className="app-container">
            <Router history={history} >
               <div>
                  <Route
                     path="/"
                     render={(props) => <LoginControl auth={auth} {...props} />}
                  />
                  <Route
                     path="/home"
                     render={(props) => <BoardContainer
                        auth={auth}
                        {...props}
                     />
                     }
                  />
                  <Route path="/callback" render={(props) => {
                     handleAuthentication(props)
                     return <Callback {...props} />
                  }} />
               </div>
            </Router>
         </div>
      )
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(App)

App.propTypes = {
   userId: PropTypes.number,
   fetchingUserId: PropTypes.bool,
   auth: PropTypes.object,
   handleAuthentication: PropTypes.func,
   fetchUser: PropTypes.func,
}