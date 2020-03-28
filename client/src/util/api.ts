import { getJson as _getJson } from 'fetchyeah'

const baseUrl = '/api'

const getJson = (url) => _getJson(`${baseUrl}/${url}`)

export const fetchResources = () => getJson('all')

export const fetchTags = () => getJson('tags')

export const searchResources = (text = '') => getJson(`search?text=${text}`)

export const filterResources = (tags: Array<string> = []) =>
  getJson(`filter?tags=${tags.join(',')}`)
