import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import resources from './reducers/resources'
import tags from './reducers/tags'
import filterSearch from './reducers/filter-search'

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  combineReducers({ resources, tags, filterSearch }),
  composeEnhancers(applyMiddleware(thunk))
)
