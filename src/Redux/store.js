import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {apiReducer} from './apiReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
    api : apiReducer,
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)














