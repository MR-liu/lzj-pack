// webpack 是node的写法 所以使用commom.js的规范导出文件
// node环境下自带的path
const {smart} = require('webpack-merge');
const path = require('path');
// const HTMLWEBPACKPLUGIN = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');
// const Happypack = require('happypack');

// const os = require("os")
// const happyThreadPool = Happypack.ThreadPool({ size: os.cpus().length })

module.exports = (config) => {
  let configBase = {};
  const entry = require('../base/entry')(config);
  const output = require('../base/output')(config);
  const modules = require('../base/module')(config);
  const plugins = require('../base/plugins')(config);
  const resolve = require('../base/resolve')(config);
  const performance = require('../base/performance')(config);
  
  configBase = smart(configBase, entry)
  configBase = smart(configBase, output)
  configBase = smart(configBase, modules)
  configBase = smart(configBase, plugins)
  configBase = smart(configBase, resolve)
  configBase = smart(configBase, performance)
  
  return configBase;
}
// module.exports = {
//   entry: ['webpack-hot-middleware/client?noInfo=true&reload=true', '@babel/polyfill','./src/index.js'],
//   output: {
//     filename: 'bundle.[hash].js', // 打包后的文件名
//     path: path.resolve(__dirname, 'dist'), // 输出地址 地址必须是绝对路径
//     // publicPath: 'http://www.liuzejin.com',
//   },
//   module: { // 模块
//     noParse: /jquery/, // 不去解析jquery的依赖库
//     rules: [ // 规则
//       {
//         test: /\.(htm|html)$/i,
//         loader: 'html-withimg-loader'
//       },
//       {
//         test: /\.(png|gif|jpg|jpeg)$/, // 图片
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 100000,
//             esModule: false,
//             outputPath: 'img/', // 路径
//             // publicPath: 'http://www.liuzejin.com',
//           }
//         },
//         include:  [path.resolve(__dirname,'./src'), path.resolve(__dirname,'./public')],
//         exclude:  path.resolve(__dirname,'./node_modules')
//       },
//       {
//         test: /\.js$/,
//         use: {
//           loader: 'eslint-loader',
//           options: {
//             enforce: 'pre', // 强制在normal之前执行
//           }
//         },
//         include:  path.resolve(__dirname,'./src'),
//         exclude:  path.resolve(__dirname,'./node_modules')
//       },
//       {
//         test: /\.js$/, // 这就是个normal
//         use: 'Happypack/loader?id=js',
//         include:  path.resolve(__dirname,'./src'),
//         exclude:  path.resolve(__dirname,'./node_modules')
//       },
//       { // css-loader 接续@import这种语法 就是css样式里面可以这样引用其他样式
//         test: /\.css$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader',
//           'postcss-loader'
//         ], // style-loader是把css样式插到head标签中 cssloader用于处理样式 顺序 从右向左执行
//       },
//       {
//         test: /\.less$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader',
//           'less-loader',
//           'postcss-loader',
//         ],
//       },
//     ]
//   },
//   plugins: [ // 数组 所有插件
//     new Happypack({
//       id: 'js',
//       threadPool: happyThreadPool,
//       use:[{
//         loader: 'babel-loader',
//         options: { // 用babel-loader 需要把es6-es5
//           presets: [
//             '@babel/preset-env',
//             '@babel/preset-react'
//           ],
//           plugins: [
//             ["@babel/plugin-proposal-decorators", { "legacy": true }], // 装饰器
//             ["@babel/plugin-proposal-class-properties", { "loose" : true }], // 类
//             "@babel/plugin-transform-runtime",
//             "@babel/plugin-syntax-dynamic-import" // 异步加载
//           ],
//         }
//       }]
//     }),
//     new HTMLWEBPACKPLUGIN({
//       template: path.join(__dirname, './public/index.html'),
//       filename: 'index.html',
//       showErrors: true,
//       inject: 'body',
//       hash: true,
//       favicon: false,
//       cache: true,
//       chunks: 'all',
//       excludeChunks: [],
//       title: 'demo',
//       xhtml: false,
//       minify: {
//         removeAttributeQuotes: true, // 去除双引号
//         collapseWhitespace: true, // 折叠成一行
//         removeComments: true, // 是否去掉注释
//         minifyJS: true, // 是否压缩html里的js（使用uglify-js进行的压缩）
//         minifyCSS: true, // 是否压缩html里的css（使用clean-css进行的压缩）
//       }
//     }),
//     new MiniCssExtractPlugin({ // 抽离样式
//       filename: 'css/main.[hash].css'
//     }),
//     // new UglifyJSPlugin({
//     //   uglifyOptions: {
//     //     compress: {
//     //       // warnings: false,
//     //       drop_debugger: false,
//     //       drop_console: true
//     //     }
//     //   }
//     // }),
//     // new CleanWebpackPlugin(),
//     new webpack.BannerPlugin('版权所有'),
//     new webpack.IgnorePlugin(/\.\/locale/,/moment/),
//     new webpack.DllReferencePlugin({ // 检索动态库
//       manifest: path.resolve(__dirname, 'dist', 'manifest.json')
//     }),
//     new webpack.NamedModulesPlugin(), // 打印更新的模块路径
//     // new webpack.HotModuleReplacementPlugin(), // 热更新插件
//     new webpack.HotModuleReplacementPlugin()

//   ],
//   resolve: { // 解析第三方包
//     modules: [path.resolve('node_modules')], // 强制在node_modules下面找 不一层层的查找
//     extensions: ['.js', '.css', '.json', 'jsx'], // 自动查找后缀
//     // mainFields: ['style', 'main'], // 主文件寻找 主要的是node_modules 下boostrap packjson的配置 这样就先取style的配置 在取main的配置
//     // mainFiles: [], // 入口文件的配置
//     // alias: { // 别名
//     //   'boostrap': 'bootstrap/dist/css/bootstrap.css', // 在JS中import boostrap; 其实指向的是node_modules的这个文件 
//     // }
//   },
//   performance: {
//     hints:'warning',
//     //入口起点的最大体积
//     maxEntrypointSize: 50000000,
//     //生成文件的最大体积
//     maxAssetSize: 30000000,
//     //只给出 js 文件的性能提示
//     assetFilter: function(assetFilename) {
//       return assetFilename.endsWith('.js');
//     }
//   }
// }