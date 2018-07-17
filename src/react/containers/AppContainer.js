import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTokenAndUser } from '../../redux/actions/user'
import App from '../components/App'
import Auth from '../../auth/Auth'
import { KJUR } from 'jsrsasign'

const port = process.env.PORT || 5000;
const host = 'localhost';
const apiUrl = `http://${host}:${port}/api/v1`

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
   if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
   }
}

const mapStateToProps = state => {
   return {
      userId: state.users.id,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchTokenAndUser: (idToken) => {
         dispatch(fetchTokenAndUser(idToken))
      }
   }
}

class AppContainer extends Component {
   componentDidMount() {
      const parsedIdToken = KJUR.jws.JWS.parse(localStorage.id_token)
      const sub = parsedIdToken.payloadObj.sub
      this.props.fetchTokenAndUser(sub)
   }

   render() {
      return <App
         auth={auth}
         handleAuthentication={handleAuthentication}
      />
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(AppContainer)

AppContainer.propTypes = {
   userId: PropTypes.number,
   fetchUserByToken: PropTypes.func,
}