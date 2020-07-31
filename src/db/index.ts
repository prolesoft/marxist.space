import * as low from 'lowdb'
import * as Adapter from 'lowdb/adapters/Memory'
import Fuse from 'fuse.js'
import { uniq, addTagAliases } from './util'
import initialDb from './db'

const fuseOptions = {
  shouldSort: true,
  tokenize: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 3,
  keys: ['href', 'title', 'tags', 'description'],
}

const adapter = new Adapter('marxist.space')

const db = low(adapter)

db.defaults({ resources: initialDb.resources }).write()

// eslint-disable-next-line fp/no-mutating-methods
const originalResources = [...db.get('resources').value()].reverse()

const enrichedResources = originalResources.map((a) => ({
  ...a,
  tags: addTagAliases(a.tags),
}))

export const getAll = () => originalResources

// @ts-ignore
export const getTags = () => uniq(originalResources.flatMap(({ tags }) => tags))

export const getOriginalResourcesByHrefs = (hrefs: Array<string>) =>
  originalResources.filter((r) => hrefs.includes(r.href))

export const filterByTags = (tags) => {
  const hrefs = enrichedResources
    .filter((bm) => tags.every((t) => bm.tags.includes(t)))
    .map(({ href }) => href)
  return getOriginalResourcesByHrefs(hrefs)
}

// @ts-ignore
const fuse = new Fuse(enrichedResources, fuseOptions)

export const fullTextSearch = (text) => {
  const hrefs = fuse.search(text).map(({ item }) => item.href)

  return getOriginalResourcesByHrefs(hrefs)
}
