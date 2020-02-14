import { fetchTags as _fetchTags } from '../util/api'

export const FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST'
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS'
export const FETCH_TAGS_ERROR = 'FETCH_TAGS_ERROR'

const fetchTagsRequest = { type: FETCH_TAGS_REQUEST }
const fetchTagsSuccess = (tags) => ({ type: FETCH_TAGS_SUCCESS, tags })
const fetchTagsError = (error) => ({ type: FETCH_TAGS_ERROR, error })

export const fetchTags = () => async (dispatch) => {
  dispatch(fetchTagsRequest)
  try {
    const tags = await _fetchTags()
    dispatch(fetchTagsSuccess(tags))
  } catch (error) {
    dispatch(fetchTagsError(error))
  }
}
