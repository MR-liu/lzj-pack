const HTMLWEBPACKPLUGIN    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Happypack            = require('happypack');
const webpack              = require('webpack');
const path                 = require('path');

const os                   = require("os");
const happyThreadPool      = Happypack.ThreadPool({ size: os.cpus().length });

module.exports = (config) => {
  const { personalizedCustomization, absolutepath } = config;
  const { plugins = [] } = personalizedCustomization;

  return {
    plugins: [ // 数组 所有插件
      ...plugins,
      new Happypack({
        id: 'js',
        threadPool: happyThreadPool,
        use:[{
          loader: 'babel-loader',
          options: { // 用babel-loader 需要把es6-es5
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }], // 装饰器
              ["@babel/plugin-proposal-class-properties", { "loose" : true }], // 类
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import" // 异步加载
            ],
          }
        }]
      }),
      new HTMLWEBPACKPLUGIN({
        template: path.join(absolutepath, './public/index.html'),
        filename: 'index.html',
        showErrors: true,
        inject: 'body',
        hash: true,
        favicon: false,
        cache: true,
        chunks: 'all',
        excludeChunks: [],
        title: 'demo',
        xhtml: false,
        minify: {
          removeAttributeQuotes: true, // 去除双引号
          collapseWhitespace: true, // 折叠成一行
          removeComments: true, // 是否去掉注释
          minifyJS: true, // 是否压缩html里的js（使用uglify-js进行的压缩）
          minifyCSS: true, // 是否压缩html里的css（使用clean-css进行的压缩）
        }
      }),
      new MiniCssExtractPlugin({ // 抽离样式
        filename: 'css/main.[hash].css'
      }),
      // new UglifyJSPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       // warnings: false,
      //       drop_debugger: false,
      //       drop_console: true
      //     }
      //   }
      // }),
      // new CleanWebpackPlugin(),
      new webpack.BannerPlugin('版权所有'),
      new webpack.IgnorePlugin(/\.\/locale/,/moment/),
      // new webpack.DllReferencePlugin({ // 检索动态库
      //   manifest: path.resolve(absolutepath, 'dist', 'manifest.json')
      // }),
      new webpack.NamedModulesPlugin(), // 打印更新的模块路径
      // new webpack.HotModuleReplacementPlugin(), // 热更新插件
      new webpack.HotModuleReplacementPlugin()

    ],
  }
}