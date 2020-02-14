import {
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR,
  FILTER_RESOURCES_SUCCESS,
  FILTER_RESOURCES_ERROR,
  SEARCH_RESOURCES_SUCCESS,
  SEARCH_RESOURCES_ERROR,
} from '../actions/resources'
import { hideErrorClearTimeout, showErrorWithTimeout } from '../actions/error'

export default (store) => (next) => (action) => {
  next(action)
  switch (action.type) {
    case FETCH_RESOURCES_SUCCESS:
    case FILTER_RESOURCES_SUCCESS:
    case SEARCH_RESOURCES_SUCCESS:
      if (store.getState().error) {
        store.dispatch(hideErrorClearTimeout())
      }
      break

    case FETCH_RESOURCES_ERROR:
    case FILTER_RESOURCES_ERROR:
    case SEARCH_RESOURCES_ERROR:
      store.dispatch(showErrorWithTimeout(action.error))
      break

    default:
      break
  }
}
