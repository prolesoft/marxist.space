import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
} from '../actions/posts'

const initialState = { isFetching: false, items: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, isFetching: true, post: null, newPost: null }
    case FETCH_POSTS_SUCCESS:
      return { ...state, isFetching: false, items: action.posts }
    case FETCH_POSTS_ERROR:
      return { ...state, isFetching: false }

    case FETCH_POST_REQUEST:
      return { ...state, isFetching: true, newPost: null }
    case FETCH_POST_SUCCESS:
      return { ...state, isFetching: false, post: action.post }
    case FETCH_POST_ERROR:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
