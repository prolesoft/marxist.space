import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import { resolve } from 'path'

const dbPath = resolve(__dirname, '..', 'db.json')
const adapter = new FileSync(dbPath)
const db = low(adapter)

db.defaults({ db: [] }).write()

export const getAll = () => db.get('db').value()

const uniq = (xs) => xs.filter((v, i, s) => s.indexOf(v) === i)

export const getTags = () => {
  const ts = db.get('db').value()
    .map((a) => a.tags).flat()
  return uniq(ts)
}

export const search = (type, search, db) => {
  try {
    const query = [...search]
    if (type === 'tags') {
      return db
        .get('db')
        .value()
        .filter((bm) => query.every((el) => bm.tags.includes(el)))
    } else {
      return db
        .get('db')
        .find({ [type]: query[0] })
        .value()
    }
  } catch (_) {
    // error
  }
}
