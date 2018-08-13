export const areListsFetching = state => {
   return state.lists.ui.isFetching
}

export const getLists = state => {
   return state.lists && state.lists.byId
}

export const getListIds = state => {
   return state.lists && state.lists.allIds
}

export const getVisibleListIds = state => {
   return state.boards && state.boards.ui && state.boards.ui.current && state.boards.ui.current.ListIds
}