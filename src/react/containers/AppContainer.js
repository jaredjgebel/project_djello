import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUserByToken } from '../../redux/actions'
import App from '../components/App'
import Auth from '../../auth/Auth'
import { KJUR } from 'jsrsasign'


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
      fetchUserByToken: (idToken) => {
         dispatch(fetchUserByToken(idToken))
      },
   }
}

class AppContainer extends Component {
   componentDidMount() {
      const parsedObj = KJUR.jws.JWS.parse(localStorage.id_token)
      const aud = parsedObj.payloadObj.aud
      this.props.fetchUserByToken(aud)
   }

   render() {
      const { userId } = this.props

      return <App
         auth={auth}
         handleAuthentication={handleAuthentication}
         userId={userId}
      />
   }
}

AppContainer.propTypes = {
   userId: PropTypes.number,
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(AppContainer)