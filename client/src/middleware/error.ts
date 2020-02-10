import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
} from '../actions/posts'
import { hideErrorClearTimeout, showErrorWithTimeout } from '../actions/error'

export default (store) => (next) => (action) => {
  next(action)
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
    case FETCH_POST_SUCCESS:
      if (store.getState().error) {
        store.dispatch(hideErrorClearTimeout())
      }
      break

    case FETCH_POSTS_ERROR:
    case FETCH_POST_ERROR:
      store.dispatch(showErrorWithTimeout(action.error))
      break

    default:
      break
  }
}
