import { getJson as _getJson } from 'fetchyeah'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9090/api'
    : `https://${window.location.hostname}/api`

const getJson = (url) => _getJson(`${baseUrl}/${url}`)

export const getPosts = () => getJson('all')

export const getPost = (id) => getJson(`post/${id}`)

export const getTags = () => getJson('tags')
