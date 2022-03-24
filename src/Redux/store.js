import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {apiReducer} from './apiReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { tooltipReducer } from './tooltipReducer'
import {viewReducer} from './viewReducer'

const rootReducer = combineReducers({
    api : apiReducer,
    tip : tooltipReducer,
    view : viewReducer,
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)














