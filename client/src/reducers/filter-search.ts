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
      if (state.tags.includes(newTag)) {
        return { ...state, tags: state.tags.filter((t) => t !== newTag) }
      }
      return { ...state, tags: state.tags.concat(newTag) }
    case CLEAR_TAGS:
      return { ...state, tags: [] }
    case SET_SEARCH:
      return { ...state, search: action.payload }
    case CLEAR_SEARCH:
      return { ...state, search: '' }
    default:
      return state
  }
}
