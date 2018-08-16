export const areCardsFetching = state => {
   return state.cards && state.cards.ui && state.cards.ui.isFetching
}

export const getAllCards = state => (state.cards)

export const getCards = state => {
   return state.cards && state.cards.byId
}

export const getCardIds = state => {
   return state.cards && state.cards.allIds
}

export const getCardAssignees = cardId => state => {
   if (cardId && state) {
      return state.cards && state.cards.byId && state.cards.byId[cardId] && state.cards.byId[cardId].AssigneeIds
   }
}