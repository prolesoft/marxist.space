import { createHash } from 'crypto'
import { resolve } from 'path'
import { omit } from 'lodash'
import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import { safeDump, safeLoad } from 'js-yaml'

export const getUrlHash = (url: string) =>
  createHash('md5')
    .update(url)
    .digest('hex')

const dbPath = resolve(__dirname, '..', '..', 'db.yml')

export const uniq = (xs) => xs.filter((v, i, s) => s.indexOf(v) === i)

const tagAliases = [
  ['abolition', 'police', 'prison', 'cops', 'policing'],
  ['anarchist', 'anarchism', 'anarchy'],
  ['beginner', 'beginners'],
  ['castro', 'fidel', 'cuba', 'che'],
  ['china', 'prc', 'deng', 'xiaoping'],
  ['debunked', 'debunk', 'debunking', 'myth'],
  ['hk', 'hongkong', 'hong-kong', 'hong kong'],
  ['deng', 'xiaoping'],
  ['documentary', 'documentaries'],
  ['glossary', 'definition', 'dictionary', 'dictionaries'],
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
  ['news', 'periodical', 'periodicals', 'media', 'msm'],
  ['north-korea', 'dprk', 'korea', 'juche'],
  ['soviet-union', 'ussr', 'soviet'],
  ['trostky', 'trot', 'troskyite', 'troskyism'],
  ['uyghur', 'uighur', 'xinjiang'],
  ['xi', 'jinping'],
  ['zapatista', 'ezln'],
]

const addTagAliases = (tags: string[]): string[] => {
  // @ts-ignore
  const possibleAliases = tagAliases
    .filter((xs) => xs.find((x) => tags.includes(x) || tags.includes(`${x}s`)))
    // @ts-ignore
    .flat()
  return uniq([...tags, ...possibleAliases])
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
      tags: addTagAliases(a.tags),
    }))
    return { resources: withIds }
  },
})

const db = low(adapter)

db.defaults({ resources: [] }).write()

export const getAll = () => db.get('resources').value()

export const getTags = () => {
  const ts = db
    .get('resources')
    .value()
    .map((a) => a.tags)
    .flat()
  return uniq(ts)
}

export const filterByTags = (tags) =>
  db
    .get('resources')
    .value()
    .filter((bm) => tags.every((t) => bm.tags.includes(t)))

export const fullTextSearch = (text) =>
  db
    .get('resources')
    .value()
    .filter((obj) =>
      JSON.stringify(obj)
        .toLowerCase()
        .includes(text.toLowerCase())
    )
