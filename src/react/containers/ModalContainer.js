import React from 'react'
import PropTypes from 'prop-types'

const ModalContainer = ({ children, header, action, buttonText, buttonClasses }) => {
   // Action prop copied to each element
   // indicates which Redux action to dispatch
   // in BoardFormContainer
   const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, { action: action })
   })

   return (
      <div>
         <button
            type="button"
            className={`btn btn-primary ${buttonClasses}`}
            data-toggle="modal"
            data-target={`#${action}Modal`}
            data-backdrop="false"
         >
            {buttonText}
         </button>

         <div
            className="modal fade"
            id={`${action}Modal`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby={`${action}ModalLabel`}
            aria-hidden="true"
         >
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id={`${action}ModalLabel`}>{header}</h5>
                     <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>

                  <div className="modal-body">
                     {childrenWithProps}
                  </div>

                  <div className="modal-footer">
                     <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ModalContainer

ModalContainer.propTypes = {
   action: PropTypes.string,
   header: PropTypes.string,
   button: PropTypes.string,
}