export const areHistoriesFetching = state => {
   return state.histories && state.histories.ui && state.histories.ui.isFetching
}

export const getHistories = state => {
   return state.histories && state.histories.byId
}

export const getHistoryIds = state => {
   return state.histories && state.histories.allIds
}