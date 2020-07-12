import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_ERROR,
} from '../actions/tags'

const initialState = { isFetching: false, items: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return { ...state, isFetching: true, tags: null }
    case FETCH_TAGS_SUCCESS:
      return { ...state, isFetching: false, items: action.tags }
    case FETCH_TAGS_ERROR:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
