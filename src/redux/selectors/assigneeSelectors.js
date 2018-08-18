export const getAllAssignees = state => (state.assignees.byId)

export const getExampleAssignees = state => {
   return state.assignees && state.assignees.examples && state.assignees.examples.exampleUsers
}

export const getExampleAssigneesStatus = state => (state.assignees && state.assignees.examples && state.assignees.examples.isFetching)

