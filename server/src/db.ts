import { resolve } from 'path'
import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import { safeDump, safeLoad } from 'js-yaml'
import * as Fuse from 'fuse.js'
import { uniq, addTagAliases } from './util'

const fuseOptions = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  keys: ['href', 'title', 'tags', 'excerpts', 'subtitle'],
}

const dbPath = resolve(__dirname, '..', '..', 'db.yml')

const adapter = new FileSync(dbPath, {
  defaultValue: [],
  serialize: safeDump,
  deserialize: safeLoad,
})

const db = low(adapter)

db.defaults({ resources: [] }).write()

const originalResources = db.get('resources').value()

const enrichedResources = originalResources.map((a) => ({
  ...a,
  tags: addTagAliases(a.tags),
}))

export const getAll = () => originalResources

export const getTags = () =>
  uniq(originalResources.map(({ tags }) => tags).flat())

export const getOriginalResourcesByHrefs = (hrefs: string[]) =>
  originalResources.filter((r) => hrefs.includes(r.href))

export const filterByTags = (tags) => {
  const hrefs = enrichedResources
    .filter((bm) => tags.every((t) => bm.tags.includes(t)))
    .map(({ href }) => href)
  return getOriginalResourcesByHrefs(hrefs)
}

const fuse = new Fuse(enrichedResources, fuseOptions)

export const fullTextSearch = (text) => {
  const hrefs = fuse.search(text).map(({ href }) => href)
  return getOriginalResourcesByHrefs(hrefs)
}
