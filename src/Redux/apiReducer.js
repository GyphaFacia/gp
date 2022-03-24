const defaultState = {
    shift: 0,
    data: {},
}

// data : {
//     'year/month/day': {...}
// }

export const setShift = (payload)=>({type: 'setShift', payload})
export const addDate = (payload) => ({type: 'addDate', payload})

export const apiReducer = (state = defaultState, action)=>{
    const {payload, type} = action

    switch (type) {
      case 'setShift': return {...state, shift: payload}

      case 'addDate':{
          return {
          ...state,
          data: {
              ...state.data,
              [payload.key]: payload.val
          }
      }}
      
      default:
          return state
    }
}
















    