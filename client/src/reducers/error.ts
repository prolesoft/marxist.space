import {
  FETCH_RESOURCES_ERROR,
  SEARCH_RESOURCES_ERROR,
  FILTER_RESOURCES_ERROR,
} from '../actions/resources'
import { HIDE_ERROR } from '../actions/error'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_ERROR:
    case FILTER_RESOURCES_ERROR:
    case SEARCH_RESOURCES_ERROR:
    case HIDE_ERROR:
      return null

    default:
      return state
  }
}
