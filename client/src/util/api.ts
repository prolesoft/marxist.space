import { getJson as _getJson } from 'fetchyeah'

const baseUrl = '/api'

const getJson = (url) => _getJson(`${baseUrl}/${url}`)

export const getResources = () => getJson('all')

export const getResource = (id) => getJson(`resource/${id}`)

export const getTags = () => getJson('tags')
