import * as low from 'lowdb'
import * as Adapter from 'lowdb/adapters/Memory'
import * as Fuse from 'fuse.js'
import { uniq, addTagAliases } from './util'
import initialDb from './db'

const fuseOptions = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  threshold: 0.4,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  keys: ['href', 'title', 'tags', 'excerpts', 'description'],
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
  const hrefs = fuse.search(text).map(({ href }) => href)
  return getOriginalResourcesByHrefs(hrefs)
}
