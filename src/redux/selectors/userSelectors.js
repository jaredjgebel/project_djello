export const getUserId = (state) => {
   return state.users && state.users.id
}

export const isFetchingId = state => {
   return state.users && state.users.isFetchingId
}

export const getUser = (state) => {
   return {
      id: getUserId(state),
      first: state.users && state.users.first,
      last: state.users && state.users.last,
      email: state.users && state.users.email,
      photo: state.users && state.users.photo,
   }
}