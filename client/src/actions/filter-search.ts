export const SET_TAG = 'SET_TAG'
export const CLEAR_TAGS = 'CLEAR_TAGS'

const setTagAction = (tag: string) => ({
  type: SET_TAG,
  payload: tag,
})

const clearTagsAction = () => ({
  type: CLEAR_TAGS,
})

export const setTag = (tag: string) => (dispatch) => {
  dispatch(setTagAction(tag))
}

export const clearTags = () => (dispatch) => {
  dispatch(clearTagsAction())
}

export const SET_SEARCH = 'SET_SEARCH'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'

const setSearchAction = (search: string) => ({
  type: SET_SEARCH,
  payload: search,
})

const clearSearchAction = () => ({
  type: CLEAR_SEARCH,
})

export const setSearch = (search: string) => (dispatch) => {
  dispatch(setSearchAction(search))
}

export const clearSearch = () => (dispatch) => {
  dispatch(clearSearchAction())
}
