
export default (state, action) => {
  switch(action.type) {
    case 'TOGGLE_LIKE':
      const index = state.findIndex(song => song.id === action.id)
      const newState = [
        ...state.slice(0, index),
        {
          ...state[index],
          liked: !state[index].liked
        },
        ...state.slice(index+1)
      ]
      return newState
  }
}
