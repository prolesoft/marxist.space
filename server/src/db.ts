import { createHash } from 'crypto'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import { safeDump, safeLoad } from 'js-yaml'

const getUrlHash = (url: string) =>
  createHash('md5')
    .update(url)
    .digest('hex')

const dbPath = resolve(__dirname, '..', 'db.yaml')

const uniq = (xs) => xs.filter((v, i, s) => s.indexOf(v) === i)

const tagAliases = [
  ['china', 'prc'],
  ['uyghur', 'uighur', 'uyghurs', 'uighurs', 'xinjiang'],
  ['abolition', 'police', 'prison', 'prisons', 'cops']
  ['north-korea', 'dprk', 'korea'],
  ['soviet-union', 'ussr', 'soviets'],
]

const addTagAliases = (tags: string[]): string[] => {
  // @ts-ignore
  const possibleAliases = tagAliases
    .filter((xs) => xs.find((x) => tags.includes(x)))
    // @ts-ignore
    .flat()
  return uniq([...tags, ...possibleAliases])
}

const adapter = new FileSync(dbPath, {
  defaultValue: [],
  serialize: safeDump,
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
