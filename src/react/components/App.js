import React from 'react'
import { Router, Route, Link } from 'react-router-dom'
import BoardContainer from '../containers/BoardContainer'
import Callback from './Callback'
import Auth from '../../auth/Auth'
import history from '../../history/history'
import LoginControl from '../containers/LoginControl'

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
   if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
   }
}
const App = ({ allBoards, currentBoard, error }) => {
   console.log('ERROR', error)

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
                  render={(props) => <BoardContainer auth={auth} {...props} />}
               />
               <Route path="/callback" render={(props => {
                  handleAuthentication(props)
                  return <Callback {...props} />
               })} />
            </div>
         </Router>
      </div>
   )
}

export default App