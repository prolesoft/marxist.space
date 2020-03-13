/* eslint-disable unicorn/no-keyword-prefix */

import {
  SET_TAG,
  CLEAR_TAGS,
  SET_SEARCH,
  CLEAR_SEARCH,
} from '../actions/filter-search'

const initialState = { search: '', tags: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TAG:
      const newTag = action.payload
      // @ts-ignore
      const newTags = state.tags.includes(newTag)
        ? state.tags.filter((t) => t !== newTag)
        : [...state.tags, newTag]

      return { ...state, tags: newTags, search: '' }
    case CLEAR_TAGS:
      return { ...state, tags: [] }
    case SET_SEARCH:
      return { ...state, search: action.payload, tags: [] }
    case CLEAR_SEARCH:
      return { ...state, search: '' }
    default:
      return state
  }
}
