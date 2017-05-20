require('./check-versions')();

const config = require('../config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const mongoose = require('mongoose');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');
const bodyParser = require('body-parser');
const schema = require('./schema.js');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = `http://localhost:${port}`;

devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at ${uri}\n`);
});

// Database
mongoose.connect('mongodb://localhost/sparcs_home');

app.post('/newYear', (req, res) => {
  const json = req.body;
  const year = new schema.Years({
    year: json.year,
    eventNumber: 1,
    photoNumber: 1,
    albums: [],
  });
  year.save((err) => {
    if (err) console.log(`some error occured.. ${err}`);
    else {
      console.log('successfully saved screenshot!');
      res.send({ result: 'success' });
    }
  });
});

app.post('/db/seminars', (req, res) => {
  const { title, speaker, date, sources } = req.body;
  const tuple = new schema.Seminars({ title, speaker, date, sources });
  tuple.save((err) => {
    if (err) res.send({ success: false });
    else res.send({ success: true });
  });
});

app.get('/db/seminars', (req, res) => {
  schema.Seminars.find({}, (err, seminars) => {
    if (err) res.send({ seminars: [] });
    else res.send({ seminars });
  });
});

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
});
