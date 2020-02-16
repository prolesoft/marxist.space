import { createHash } from 'crypto'
import { resolve } from 'path'
import { omit } from 'lodash'
import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import { safeDump, safeLoad } from 'js-yaml'
import * as Fuse from 'fuse.js'
import * as pluralize from 'pluralize'

const fuseOptions = {
  shouldSort: true,
  tokenize: true,
  threshold: 0.4,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  keys: ['href', 'title', 'tags', 'excerpts', 'subtitle'],
}

export const getUrlHash = (url: string) =>
  createHash('md5')
    .update(url)
    .digest('hex')

const dbPath = resolve(__dirname, '..', '..', 'db.yml')

export const uniq = (xs) => xs.filter((v, i, s) => s.indexOf(v) === i)

const tagAliases = [
  ['abolition', 'police', 'prison', 'cop', 'policing'],
  ['anarchist', 'anarchism', 'anarchy'],
  ['castro', 'fidel', 'cuba', 'che'],
  ['china', 'prc', 'deng', 'xiaoping'],
  ['debunked', 'debunk', 'debunking', 'myth'],
  ['hk', 'hongkong', 'hong-kong', 'hong kong'],
  ['deng', 'xiaoping'],
  ['glossary', 'definition', 'dictionary'],
  ['health', 'healthcare', 'health care'],
  ['israel', 'palestine'],
  ['latin', 'latam'],
  ['library', 'libraries'],
  ['list', 'collection'],
  ['mao', 'zedong', 'tsetung'],
  [
    'ml',
    'marxist-leninist',
    'leninist',
    'stalinist',
    'marxist leninist',
    'leninism',
    'stalinism',
    'marxism-leninism',
    'marxism leninism',
  ],
  ['mlm', 'maoist', 'mao', 'maoism'],
  ['news', 'periodical', 'media', 'msm'],
  ['north-korea', 'dprk', 'korea', 'juche'],
  ['soviet-union', 'ussr', 'soviet'],
  ['trostky', 'trot', 'troskyite', 'troskyism'],
  ['uyghur', 'uighur', 'xinjiang'],
  ['xi', 'jinping'],
  ['zapatista', 'ezln'],
]

const addPlurals = (tags: string[]): string[] =>
  uniq(
    // @ts-ignore
    tags.map((tag) => [pluralize.plural(tag), pluralize.singular(tag)]).flat()
  )

const addTagAliases = (tags: string[]): string[] => {
  const pluralized = addPlurals(tags)
  // @ts-ignore
  const possibleAliases = tagAliases
    .filter((xs) => xs.find((x) => pluralized.includes(x)))
    // @ts-ignore
    .flat()
  return uniq([...pluralized, ...possibleAliases])
}

const adapter = new FileSync(dbPath, {
  defaultValue: [],
  serialize: (xs) =>
    safeDump({ resources: xs.resources.map((r) => omit(r, 'id')) }),
  deserialize: (xs) => {
    const loaded = safeLoad(xs)
    const withIds = loaded.resources.map((a) => ({
      ...a,
      id: getUrlHash(a.href),
    }))
    return { resources: withIds }
  },
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

export const getOriginalResourcesByIds = (ids: string[]) =>
  originalResources.filter((r) => ids.includes(r.id))

export const filterByTags = (tags) => {
  const ids = enrichedResources
    .filter((bm) => tags.every((t) => bm.tags.includes(t)))
    .map(({ id }) => id)
  return getOriginalResourcesByIds(ids)
}

const fuse = new Fuse(enrichedResources, fuseOptions)

export const fullTextSearch = (text) => {
  const ids = fuse.search(text).map(({ id }) => id)
  return getOriginalResourcesByIds(ids)
}
