import 'isomorphic-fetch'
import * as http from 'http'
import { resolve } from 'path'
import * as Koa from 'koa'
import * as Router from '@koa/router'
import { postJson } from 'fetchyeah'
import * as mid from 'koa-mid'
import serve from 'koa-simple-static'
import * as db from './db'

export const app: Koa = new Koa()

const publicDir = resolve(__dirname, '..', '..', 'public')
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

router.post('/create-issue', async (ctx) => {
  const { content } = ctx.request.body
  try {
    await postJson(
      'https://api.github.com/repos/prolesoft/marxist.space/issues',
      {
        // @ts-ignore
        headers: {
          authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        body: {
          title: 'New Resource',
          body: content,
          labels: ['resource'],
        },
      }
    )
    ctx.status = 201
    ctx.body = JSON.stringify('created')
  } catch (e) {
    ctx.status = e.status || e.code || 500
    ctx.body = e.message || 'Something went wrong'
  }
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
app.use(serve({ dir: publicDir }))
app.use(router.routes())
app.use(errorHandler)

const handler = app.callback()

const server = http.createServer((req, res) => {
  handler(req, res)
})

const main = () => {
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`marxist.space listening on ${port}`)
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
