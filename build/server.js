if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

if (process.env.NODE_ENV == 'production') {
  require('./server.prod.js')()
} else {
  require('./server.dev.js')()
}
