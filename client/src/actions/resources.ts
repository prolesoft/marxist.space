import {
  fetchResources as _fetchResources,
  searchResources as _searchResources,
  filterResources as _filterResources,
} from '../util/api'

export const FETCH_RESOURCES_REQUEST = 'FETCH_RESOURCES_REQUEST'
export const FETCH_RESOURCES_SUCCESS = 'FETCH_RESOURCES_SUCCESS'
export const FETCH_RESOURCES_ERROR = 'FETCH_RESOURCES_ERROR'

const fetchResourcesRequest = { type: FETCH_RESOURCES_REQUEST }
const fetchResourcesSuccess = (resources) => ({
  type: FETCH_RESOURCES_SUCCESS,
  resources,
})
const fetchResourcesError = (error) => ({ type: FETCH_RESOURCES_ERROR, error })

export const fetchResources = () => async (dispatch) => {
  dispatch(fetchResourcesRequest)
  try {
    const resources = await _fetchResources()
    dispatch(fetchResourcesSuccess(resources))
  } catch (error) {
    dispatch(fetchResourcesError(error))
  }
}

export const FILTER_RESOURCES_REQUEST = 'FILTER_RESOURCES_REQUEST'
export const FILTER_RESOURCES_SUCCESS = 'FILTER_RESOURCES_SUCCESS'
export const FILTER_RESOURCES_ERROR = 'FILTER_RESOURCES_ERROR'

const filterResourcesRequest = (tags: string[]) => ({
  type: FILTER_RESOURCES_REQUEST,
  payload: tags,
})
const filterResourcesSuccess = (resources) => ({
  type: FILTER_RESOURCES_SUCCESS,
  resources,
})
const filterResourcesError = (error) => ({
  type: FILTER_RESOURCES_ERROR,
  error,
})

export const filterResources = (tags: string[]) => async (dispatch) => {
  dispatch(filterResourcesRequest(tags))
  try {
    const resources = await _filterResources(tags)
    dispatch(filterResourcesSuccess(resources))
  } catch (error) {
    dispatch(filterResourcesError(error))
  }
}

export const SEARCH_RESOURCES_REQUEST = 'SEARCH_RESOURCES_REQUEST'
export const SEARCH_RESOURCES_SUCCESS = 'SEARCH_RESOURCES_SUCCESS'
export const SEARCH_RESOURCES_ERROR = 'SEARCH_RESOURCES_ERROR'

const searchResourcesRequest = (text: string) => ({
  type: SEARCH_RESOURCES_REQUEST,
  payload: text,
})
const searchResourcesSuccess = (resources) => ({
  type: SEARCH_RESOURCES_SUCCESS,
  resources,
})
const searchResourcesError = (error) => ({
  type: SEARCH_RESOURCES_ERROR,
  error,
})

export const searchResources = (text: string) => async (dispatch) => {
  dispatch(searchResourcesRequest(text))
  try {
    const resources = await _searchResources(text)
    dispatch(searchResourcesSuccess(resources))
  } catch (error) {
    dispatch(searchResourcesError(error))
  }
}
