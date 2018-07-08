import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { KJUR } from 'jsrsasign'
import BoardContainer from '../containers/BoardContainer'
import Callback from './Callback'
import Auth from '../../auth/Auth'
import history from '../../history/history'
import LoginControl from '../containers/LoginControl'
import { fetchBoards, fetchUser, fetchUserByToken } from '../../redux/actions'

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
   if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
   }
}

const mapStateToProps = state => {
   console.log('STATE', state)
   return {
      allBoards: state.allUserBoards,
      currentBoard: state.current,
      error: state.error,
      userId: state.users.id,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchBoards: (userId) => {
         dispatch(fetchBoards(userId))
      },
      fetchUser: (userId) => {
         dispatch(fetchUser(userId))
      },
      fetchUserByToken: (idToken) => {
         dispatch(fetchUserByToken(idToken))
      },
   }
}

class App extends Component {
   componentDidMount() {
      const parsedObj = KJUR.jws.JWS.parse(localStorage.id_token)
      const aud = parsedObj.payloadObj.aud
      this.props.fetchUserByToken(aud)
   }

   render() {
      const { allBoards, currentBoard, error, userId } = this.props
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
                        allBoards={allBoards}
                        currentBoard={currentBoard}
                        error={error}
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
   fetchBoards: PropTypes.func,
   allBoards: PropTypes.array,
   currentBoard: PropTypes.object,
   error: PropTypes.string,
}