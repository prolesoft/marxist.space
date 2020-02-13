import { getResources, getResource } from '../util/api'

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
    const resources = await getResources()
    dispatch(fetchResourcesSuccess(resources))
  } catch (error) {
    dispatch(fetchResourcesError(error))
  }
}

export const FETCH_RESOURCE_REQUEST = 'FETCH_RESOURCE_REQUEST'
export const FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS'
export const FETCH_RESOURCE_ERROR = 'FETCH_RESOURCE_ERROR'

const fetchResourceRequest = { type: FETCH_RESOURCE_REQUEST }
const fetchResourceSuccess = (resource) => ({
  type: FETCH_RESOURCE_SUCCESS,
  resource,
})
const fetchResourceError = (error) => ({ type: FETCH_RESOURCE_ERROR, error })

export const fetchResource = (id) => async (dispatch) => {
  dispatch(fetchResourceRequest)
  try {
    const resource = await getResource(id)
    dispatch(fetchResourceSuccess(resource))
  } catch (error) {
    dispatch(fetchResourceError(error))
  }
}
