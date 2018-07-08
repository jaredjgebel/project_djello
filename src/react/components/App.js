import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BoardContainer from '../containers/BoardContainer'
import Callback from './Callback'
import history from '../../history/history'
import LoginControl from '../containers/LoginControl'
import { fetchUser } from '../../redux/actions'

const mapStateToProps = state => {
   return {
      fetchingUserId: state.users.isFetchingId,
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
   componentDidMount() {
      if (!this.props.fetchingUserId) {
         this.props.fetchUser(this.props.userId)
      }
   }

   render() {
      const { auth, handleAuthentication, userId } = this.props
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
                        userId={userId}
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
}