import { getTags, getAll, fullTextSearch, filterByTags } from '../db'

export const fetchResources = () => Promise.resolve(getAll())

export const fetchTags = () => Promise.resolve(getTags())

export const searchResources = (text = '') =>
  Promise.resolve(fullTextSearch(text))

export const filterResources = (tags: Array<string> = []) =>
  Promise.resolve(filterByTags(tags))
