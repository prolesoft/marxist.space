import {
  FETCH_POSTS_ERROR,
  FETCH_POST_ERROR,
} from '../actions/posts'
import { HIDE_ERROR } from '../actions/error'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_ERROR:
    case FETCH_POST_ERROR:
    case HIDE_ERROR:
      return null

    default:
      return state
  }
}
