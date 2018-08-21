import React, { Component } from 'react';
import '../stylesheets/LoginControl.css'

class LoginControl extends Component {
   goTo(route) {
      this.props.history.replace(`/${route}`)
   }

   login() {
      this.props.auth.login();
   }

   logout() {
      this.props.auth.logout();
   }

   render() {
      const { isAuthenticated } = this.props.auth;

      return (
         <div>
            <nav className="navbar logged-out-nav fixed-top">
               <div className="navbar-brand" style={{ color: "whitesmoke" }}>
                  Djello Task Management
               </div>
               {
                  !isAuthenticated() && (
                     <button
                        className="btn btn-primary btn-margin"
                        onClick={this.login.bind(this)}
                     >
                        Log In
                   </button>
                  )
               }
               {
                  isAuthenticated() && (
                     <button
                        color="primary"
                        className="btn btn-primary btn-margin"
                        onClick={this.logout.bind(this)}
                     >
                        Log Out
                   </button>
                  )
               }
            </nav>
         </div>
      );
   }
}

export default LoginControl