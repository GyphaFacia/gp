const defaultState = {
    pos: {x:0, y:0},
    tooltip: '',
    visible: false,
}

export const setPos = (payload)=>({type: 'setPos', payload})
export const setTooltip = (payload)=>({type: 'setTooltip', payload})
export const setVisible = (payload)=>({type: 'setVisible', payload})

export const tooltipReducer = (state = defaultState, action)=>{
    const {payload, type} = action

    switch (type) {
        case 'setPos': return {...state, pos: payload}
        case 'setTooltip': return {...state, tooltip: payload}
        case 'setVisible': return {...state, visible: payload}

        default:
            return state
    }
}
















    