import * as http from 'http'
import { resolve } from 'path'
import * as Koa from 'koa'
import * as Router from '@koa/router'
import serve from 'koa-simple-static'
import * as mid from 'koa-mid'
import * as cors from 'koa-cors'
import * as db from './db'

export const app: Koa = new Koa()

const isTest = process.env.NODE_ENV === 'test'
const port = process.env.PORT || 9090

const router = new Router({
  prefix: '/api',
})

router.get('/tags', async (ctx) => {
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(db.getTags())
})

router.get('/all', async (ctx) => {
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(db.getAll())
})

router.get('/params-example/:anything', async (ctx) => {
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(ctx.params.anything)
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

app.use(mid)
// TODO: prod configuration
app.use(cors())
app.use(router.routes())
app.use(
  serve({
    dir: resolve(__dirname, '..', 'public'),
  })
)
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
