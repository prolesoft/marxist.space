import {
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR,
  FILTER_RESOURCES_REQUEST,
  FILTER_RESOURCES_SUCCESS,
  FILTER_RESOURCES_ERROR,
  SEARCH_RESOURCES_REQUEST,
  SEARCH_RESOURCES_SUCCESS,
  SEARCH_RESOURCES_ERROR,
} from '../actions/resources'

const initialState = { isFetching: false, items: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_REQUEST:
    case FILTER_RESOURCES_REQUEST:
    case SEARCH_RESOURCES_REQUEST:
      return { ...state, isFetching: true, resource: null, newResource: null }
    case FETCH_RESOURCES_SUCCESS:
    case FILTER_RESOURCES_SUCCESS:
    case SEARCH_RESOURCES_SUCCESS:
      return { ...state, isFetching: false, items: action.resources }
    case FETCH_RESOURCES_ERROR:
    case FILTER_RESOURCES_ERROR:
    case SEARCH_RESOURCES_ERROR:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
