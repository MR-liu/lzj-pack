const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (config) => {
  const { personalizedCustomization, absolutepath, publicPath } = config;
  const { modules } = personalizedCustomization;
  // console.log(config)
  return {
    module: { // 模块
      ...modules,
      rules: [ // 规则
        {
          test: /\.(htm|html)$/i,
          loader: 'html-withimg-loader'
        },
        {
          test: /\.(png|gif|jpg|jpeg)$/, // 图片
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              esModule: false,
              outputPath: 'img/', // 路径
              publicPath,
            }
          },
          include:  [path.resolve(absolutepath,'./src'), path.resolve(absolutepath,'./public')],
          exclude:  path.resolve(absolutepath,'./node_modules')
        },
        // {
        //   test: /\.js$/,
        //   use: {
        //     loader: 'eslint-loader',
        //     options: {
        //       enforce: 'pre', // 强制在normal之前执行
        //     }
        //   },
        //   include:  path.resolve(absolutepath,'./src'),
        //   exclude:  path.resolve(absolutepath,'./node_modules')
        // },
        {
          test: /\.js$/, // 这就是个normal
          use: 'Happypack/loader?id=js',
          // include:  path.resolve(absolutepath,'./src'),
          // exclude:  path.resolve(absolutepath,'./node_modules')
        },
        { // css-loader 接续@import这种语法 就是css样式里面可以这样引用其他样式
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ], // style-loader是把css样式插到head标签中 cssloader用于处理样式 顺序 从右向左执行
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader',
            'postcss-loader',
          ],
        },
      ]
    }
  }
}