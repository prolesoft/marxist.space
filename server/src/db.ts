import { resolve } from 'path'
import { readFileSync } from 'fs'
import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import { safeDump, safeLoad } from 'js-yaml'

const dbPath = resolve(__dirname, '..', 'db.yaml')

const adapter = new FileSync(dbPath, {
  defaultValue: [],
  serialize: safeDump,
  deserialize: safeLoad,
})

const db = low(adapter)

db.defaults({ db: [] }).write()

export const getAll = () => db.get('resources').value()

const uniq = (xs) => xs.filter((v, i, s) => s.indexOf(v) === i)

export const getTags = () => {
  const ts = db.get('resources').value()
    .map((a) => a.tags).flat()
  return uniq(ts)
}

export const search = (type, search, db) => {
  try {
    const query = [...search]
    if (type === 'tags') {
      return db
        .get('resources')
        .value()
        .filter((bm) => query.every((el) => bm.tags.includes(el)))
    } else {
      return db
        .get('resources')
        .find({ [type]: query[0] })
        .value()
    }
  } catch (_) {
    // error
  }
}
