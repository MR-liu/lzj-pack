const express              = require('express');
const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const files                = require('../lib/files');
const absolutepath         = files.getAbsolutepath();

const devconfig            = require('../config/webpack.config.dev');
const { version }          = require('../package.json');
const getProxyMiddlewares  = require('../proxy/getProxyMiddlewares')

const app                  = express()

/**
 * @description server
 * @param configs 为注入配置项
 */
module.exports = (configs) => {
  const { config = 'webpack.config.js', port, publicPath } = configs;

  const havePersonalizedCustomization = files.directoryExists(`${absolutepath}/${config}`);
  let personalizedCustomization = {};

  // 检测自定义配置
  if (!havePersonalizedCustomization) {
    console.info('未找到个性化配置，启用默认配置。');
  } else {
    personalizedCustomization = require(`${absolutepath}/${config}`);
  }

  const { proxy, defaultRedirect, before } = personalizedCustomization

  const serverOptions = {
    quiet: false,
    noInfo: true,
    publicPath: publicPath || '',
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
  };

  const serverconfig = devconfig({
    personalizedCustomization,
    version,
    port,
    absolutepath,
    before, // 钩子
  })

  const complier = webpack(serverconfig);

  app.use(webpackDevMiddleware(complier, serverOptions));

  app.use(webpackHotMiddleware(complier, {
    log: (info) => console.log(info),
    heartbeat: 1000
  }))


  app.use(getProxyMiddlewares(proxy));

  if (defaultRedirect) {
    app.get('/', (req, res) => res.redirect(defaultRedirect));
  }
  
  console.log('===========================================================', personalizedCustomization)
  app.listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info('==> 🚧  glove server listening on port %s', port);
    }
  });
}