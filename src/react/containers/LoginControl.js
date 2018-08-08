import React, { Component } from 'react';
import {
   Navbar,
   NavbarBrand,
   Button,
} from 'reactstrap'

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
            <Navbar fluid="true" fixed="top" dark={true}>
               <NavbarBrand>
                  Djello Task Management
               </NavbarBrand>
               {
                  !isAuthenticated() && (
                     <Button
                        color="primary"
                        className="btn-margin"
                        onClick={this.login.bind(this)}
                     >
                        Log In
                   </Button>
                  )
               }
               {
                  isAuthenticated() && (
                     <Button
                        color="primary"
                        className="btn-margin"
                        onClick={this.logout.bind(this)}
                     >
                        Log Out
                   </Button>
                  )
               }
            </Navbar>
         </div>
      );
   }
}

export default LoginControl