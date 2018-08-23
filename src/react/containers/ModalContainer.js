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
      const { children } = this.props
      // Action prop copied to each element
      // indicates which Redux action to dispatch
      // in BoardFormContainer
      const childrenWithProps = React.Children.map(children, child => {
         return React.cloneElement(child, { action: this.props.action })
      })

      return (
         <div>
            {/* <div class="modal" tabindex="-1" role="dialog">
               <div class="modal-dialog" role="document">
                  <div class="modal-content">
                     <div class="modal-header">
                     <h5 class="modal-title">Modal title</h5>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                     </div>
                     <div class="modal-body">
                     <p>Modal body text goes here.</p>
                     </div>
                     <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                     <button type="button" class="btn btn-primary">Save changes</button>
                     </div>
                  </div>
               </div>
               </div> */}



            <button onClick={this.toggle} className={`btn btn-primary ${this.props.buttonClasses}`}>{this.props.button}</button>
            <Modal
               isOpen={this.state.modal}
               toggle={this.toggle}
               className={this.props.className}
            >
               <ModalHeader toggle={this.toggle}>
                  {this.props.header}
               </ModalHeader>

               <ModalBody>
                  {childrenWithProps}
               </ModalBody>

               <ModalFooter>
                  <Button color="warning" onClick={this.toggle}>Cancel</Button>
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
   button: PropTypes.string,
}