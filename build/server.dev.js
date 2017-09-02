const webpackConfig = require('./webpack.dev.conf');
const config = require('../config').dev;
const compiler = require('webpack')(webpackConfig);
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
});
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  },
});

module.exports = () => {
  require('./server.base.js')(webpackConfig, config, compiler, devMiddleware, hotMiddleware)
}
