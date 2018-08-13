export const getCurrentBoard = state => {
   return state.boards.ui && state.boards.ui.current
}

export const isBoardFetching = state => {
   return state.boards.ui && state.boards.ui.isFetching
}

export const getAllBoards = state => {
   return state.boards
}

export const getAllBoardIds = state => {
   const allIds = state.boards && state.boards.allIds

   if (allIds !== []) {
      return allIds.filter(id => {
         if (!id) {
            return false
         }
         return true
      })
   } else {
      return []
   }
}

export const getBoardsById = state => {
   return state.boards && state.boards.byId
}

export const getBoardNames = state => {
   const allIds = getAllBoardIds(state)
   const byId = getBoardsById(state)

   let boardNames = []

   if (allIds !== [] && byId) {
      boardNames = allIds.map(id => byId[id].title)
   } else {
      boardNames = []
   }

   return boardNames
}

export const getBoardId = state => {
   return state.boards && state.boards.ui && state.boards.ui.current && state.boards.ui.current.id
}