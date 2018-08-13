import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import App from '../components/App'
import Auth from '../../auth/Auth'
import { KJUR } from 'jsrsasign'
import { fetchTokenAndUser } from '../../redux/actions/user'
import { getUserId } from '../../redux/selectors/userSelectors'

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
   if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
   }
}

const mapStateToProps = state => {
   return {
      userId: getUserId(state),
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