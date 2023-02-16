const filterReducer = (state = '', action) => {
  if (action.type === 'FILTER') { return action.payload }
  return state
}

// action creator
export const filter = (filterText) => {
  return {
    type: 'FILTER',
    payload: filterText
  }
}

export default filterReducer