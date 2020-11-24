import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import shoppingReducer from './shopping'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    shoppingReducer
  })

export default createRootReducer
