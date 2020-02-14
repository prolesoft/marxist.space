import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import error from './reducers/error'
import resources from './reducers/resources'
import theme from './reducers/theme'
import tags from './reducers/tags'
import filterSearch from './reducers/filter-search'
import errorMiddleware from './middleware/error'
import themeMiddleware from './middleware/theme'

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  combineReducers({ error, resources, tags, filterSearch, theme }),
  composeEnhancers(applyMiddleware(thunk, errorMiddleware, themeMiddleware))
)
