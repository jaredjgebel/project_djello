import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import Assignee from '../components/Assignee'
import { fetchExampleUsers } from '../../redux/actions/assignees'
import { getUserId } from '../../redux/selectors/userSelectors';

const mapStatetoProps = state => {
   return {
      isFetching: state.assignees && state.assignees.examples && state.assignees.examples.isFetching,
      exampleUsers: state.assignees && state.assignees.examples && state.assignees.examples.exampleUsers,
      userId: getUserId(state),
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchExampleUsers: (userId) => {
         dispatch(fetchExampleUsers(userId))
      }
   }
}

class AssigneesFormContainer extends Component {
   componentDidMount() {
      this.props.fetchExampleUsers(this.props.userId)
   }

   render() {
      if (this.props.isFetching || !this.props.exampleUsers) {
         return (
            <div>
               <p>Loading...</p>
            </div>
         )
      } else {
         const userElements = this.props.exampleUsers.map(user => (
            <Assignee
               assignee={user}
            />
         ))
         return (
            <div>
               {userElements}
            </div>
         )
      }
   }
}

export default connect(
   mapStatetoProps,
   mapDispatchToProps
)(AssigneesFormContainer)