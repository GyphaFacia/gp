const defaultState = {
    viewMode: 'grid',
}
export const setViewMode = (payload) => ({type: 'setViewMode', payload})

export const viewReducer = (state = defaultState, action)=>{
    const {payload, type} = action

    switch (type) {
      case 'setViewMode': return {...state, viewMode: payload}

      default:
          return state
    }
}
















    