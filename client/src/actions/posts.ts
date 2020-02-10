import {
  getPosts,
  getPost,
} from '../util/api'

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR'

const fetchPostsRequest = { type: FETCH_POSTS_REQUEST }
const fetchPostsSuccess = (posts) => ({ type: FETCH_POSTS_SUCCESS, posts })
const fetchPostsError = (error) => ({ type: FETCH_POSTS_ERROR, error })

export const fetchPosts = () => async (dispatch) => {
  dispatch(fetchPostsRequest)
  try {
    const posts = await getPosts()
    dispatch(fetchPostsSuccess(posts))
  } catch (error) {
    dispatch(fetchPostsError(error))
  }
}

export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST'
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
export const FETCH_POST_ERROR = 'FETCH_POST_ERROR'

const fetchPostRequest = { type: FETCH_POST_REQUEST }
const fetchPostSuccess = (post) => ({ type: FETCH_POST_SUCCESS, post })
const fetchPostError = (error) => ({ type: FETCH_POST_ERROR, error })

export const fetchPost = (id) => async (dispatch) => {
  dispatch(fetchPostRequest)
  try {
    const post = await getPost(id)
    dispatch(fetchPostSuccess(post))
  } catch (error) {
    dispatch(fetchPostError(error))
  }
}
