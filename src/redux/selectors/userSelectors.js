export const getUserId = (state) => {
   return state.users && state.users.id
}

export const isFetchingId = state => {
   return state.users && state.users.isFetchingId
}