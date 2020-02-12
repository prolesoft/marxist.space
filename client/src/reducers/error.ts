import { FETCH_RESOURCES_ERROR, FETCH_RESOURCE_ERROR } from '../actions/resources'
import { HIDE_ERROR } from '../actions/error'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_ERROR:
    case FETCH_RESOURCE_ERROR:
    case HIDE_ERROR:
      return null

    default:
      return state
  }
}
