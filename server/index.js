const http = require('http')

http.globalAgent.keepAlive = true
http.globalAgent.keepAliveMsecs = 60000

process.on('unhandledRejection', console.error)

require('dnscache')({
  enable: true,
  ttl: 300,
  cachesize: 1000,
})

require('boring-cluster')('./lib', { name: 'marxist.space' })
