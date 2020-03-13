/* eslint-env jest */

import * as http from 'http'
import { app } from '.'
// eslint-disable-next-line node/no-unpublished-import
import * as request from 'supertest'

describe('server', () => {
  let server = null

  beforeEach(async () => {
    server = http.createServer(app.callback())
  })

  afterEach(() => {
    server.close()
  })

  test('/api/tags', async () => {
    const res = await request(server).get('/api/tags')
    expect(res.status).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('/api/all', async () => {
    const res = await request(server).get('/api/all')
    expect(res.status).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('/api/search', async () => {
    const res = await request(server).get('/api/search?text=dprk')
    expect(res.status).toEqual(200)
    expect(res.body.length > 1).toBe(true)
  })

  test('/api/filter', async () => {
    const res = await request(server).get('/api/filter?tags=dprk,youtube')
    expect(res.status).toEqual(200)
    expect(res.body.length > 1).toBe(true)
  })
})
