const defaultState = {
    detailsItem: {},
    showDetails: false,
}

export const setDetailsItem = (payload)=>({type: 'setDetailsItem', payload})
export const setShowDetails = (payload)=>({type: 'setShowDetails', payload})

export const detailsReducer = (state = defaultState, action)=>{
    const {payload, type} = action

    switch (type) {
        case 'setDetailsItem': return {...state, detailsItem: payload}
        case 'setShowDetails': return {...state, showDetails: payload}

        default:
            return state
    }
}
















    