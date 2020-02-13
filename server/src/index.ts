import * as http from 'http'
import { resolve } from 'path'
import * as Koa from 'koa'
import * as Router from '@koa/router'
import * as mid from 'koa-mid'
import serve from 'koa-simple-static'
import * as db from './db'

export const app: Koa = new Koa()

const isTest = process.env.NODE_ENV === 'test'
const port = process.env.PORT || 9090

const router = new Router({
  prefix: '/api',
})

router.get('/tags', async (ctx) => {
  ctx.body = JSON.stringify(db.getTags())
})

router.get('/filter', async (ctx) => {
  ctx.body = JSON.stringify(db.filterByTags(ctx.query.tags.split(',')))
})

router.get('/search', async (ctx) => {
  ctx.body = JSON.stringify(db.fullTextSearch(ctx.query.text))
})

router.get('/all', async (ctx) => {
  ctx.body = JSON.stringify(db.getAll())
})

const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.app.emit('error', err, ctx)
    ctx.body = err
  }
}

const setType = async (ctx, next) => {
  ctx.type = 'application/json'
  await next()
}

app.use(setType)
app.use(mid)
app.use(serve({ dir: resolve(__dirname, '..', '..', 'public') }))
app.use(router.routes())
app.use(errorHandler)

const handler = app.callback()

const server = http.createServer((req, res) => {
  handler(req, res)
})

const main = () => {
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`example listening on ${port}`)
  })

  process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0)
    })
  })
}

if (!isTest) {
  main()
}
