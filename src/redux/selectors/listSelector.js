export const areListsFetching = state => {
   return state.lists.ui.isFetching
}

export const getLists = state => {
   return state.lists && state.lists.byId
}

export const getListIds = state => {
   return state.lists && state.lists.allIds
}