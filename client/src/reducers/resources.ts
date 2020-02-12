import {
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR,
  FETCH_RESOURCE_REQUEST,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_ERROR,
} from '../actions/resources'

const initialState = { isFetching: false, items: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_REQUEST:
      return { ...state, isFetching: true, resource: null, newResource: null }
    case FETCH_RESOURCES_SUCCESS:
      return { ...state, isFetching: false, items: action.resources }
    case FETCH_RESOURCES_ERROR:
      return { ...state, isFetching: false }

    case FETCH_RESOURCE_REQUEST:
      return { ...state, isFetching: true, newResource: null }
    case FETCH_RESOURCE_SUCCESS:
      return { ...state, isFetching: false, resource: action.resource }
    case FETCH_RESOURCE_ERROR:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
