import {
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_ERROR,
} from '../actions/resources'
import { hideErrorClearTimeout, showErrorWithTimeout } from '../actions/error'

export default (store) => (next) => (action) => {
  next(action)
  switch (action.type) {
    case FETCH_RESOURCES_SUCCESS:
    case FETCH_RESOURCE_SUCCESS:
      if (store.getState().error) {
        store.dispatch(hideErrorClearTimeout())
      }
      break

    case FETCH_RESOURCES_ERROR:
    case FETCH_RESOURCE_ERROR:
      store.dispatch(showErrorWithTimeout(action.error))
      break

    default:
      break
  }
}
