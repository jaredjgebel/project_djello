import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class ModalContainer extends Component {
   constructor() {
      super()
      this.state = {
         modal: false,
      }

      this.toggle = this.toggle.bind(this)
   }

   toggle() {
      this.setState({
         modal: !this.state.modal,
      })
   }

   render() {
      // const { children } = this.props
      // const childrenWithProps = React.Children.map((children, child => React.cloneElement(child, { toggle: this.toggle })))

      // console.log(children)

      return (
         <div>
            <Button color="primary" onClick={this.toggle}>{this.props.action}</Button>
            <Modal
               isOpen={this.state.modal}
               toggle={this.toggle}
               className={this.props.className}
            >
               <ModalHeader toggle={this.toggle}>
                  {this.props.header}
               </ModalHeader>

               <ModalBody>
                  {this.props.children}
               </ModalBody>

               <ModalFooter>
                  <Button color="danger" onClick={this.toggle}>Cancel</Button>
               </ModalFooter>
            </Modal>
         </div>
      )
   }
}

export default ModalContainer

ModalContainer.propTypes = {
   action: PropTypes.string,
   header: PropTypes.string,
}