import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import error from './reducers/error'
import posts from './reducers/posts'
import theme from './reducers/theme'
import errorMiddleware from './middleware/error'
import themeMiddleware from './middleware/theme'

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  combineReducers({ error, posts, theme }),
  composeEnhancers(
    applyMiddleware(thunk, errorMiddleware, themeMiddleware)
  )
)
