var webpack = require('webpack');
var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'mytest' || process.env.NODE_ENV === 'sit')
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'api':path.resolve(__dirname, '../src/api'),
        'src': path.resolve(__dirname, '../src'),
        'assets': path.resolve(__dirname, '../src/assets'),
        'components': path.resolve(__dirname, '../src/components'),
        'store':path.resolve(__dirname,'../src/store'),
        //'jquery': path.resolve(__dirname, '../static/js/jquery'),
        //npm 安装引用
        'jquery':'jquery',
        'lib':path.resolve(__dirname,'../src/lib'),
        'static': path.resolve(__dirname,'../static'),
        'bootstrap':path.resolve(__dirname, '../static/js/bootstrap.min'),
        'scrollTo' :path.resolve(__dirname,'../static/js/jquery.scrollTo.min'),
        'nicescroll' :path.resolve(__dirname,'../static/js/jquery.nicescroll'),
        //common script for all pages
        'common_scripts' :path.resolve(__dirname, '../static/js/common-scripts'),
        'mloading' :path.resolve(__dirname, '../static/js/jquery.mloading'),
        //日期插件
        'bootstrap_datetimepicker' :path.resolve(__dirname, '../static/js/bootstrap-datetimepicker.min'),
        'bootstrap_datetimepicker_language' :path.resolve(__dirname, '../static/js/bootstrap-datetimepicker.zh-CN'),
        //jstree
        'jstree' :path.resolve(__dirname, '../static/jstree/jstree.min'),
        'wangEditor':path.resolve(__dirname, '../static/wangEditor')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
