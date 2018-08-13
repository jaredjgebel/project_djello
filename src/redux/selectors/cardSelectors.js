export const areCardsFetching = state => {
   return state.cards && state.cards.ui && state.cards.ui.isFetching
}

export const getCards = state => {
   return state.cards && state.cards.byId
}

export const getCardIds = state => {
   return state.cards && state.cards.allIds
}