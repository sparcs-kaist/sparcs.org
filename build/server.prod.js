const webpackConfig = require('./webpack.prod.conf');
const config = require('../config').build;

module.exports = () => {
  require('./server.base.js')(webpackConfig, config)
}
