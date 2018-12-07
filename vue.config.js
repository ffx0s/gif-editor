/* eslint-env node */

const path = require('path')
const { assetsDomain } = require('./src/config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const px2remOptions = {
  remUnit: 16,
  remPrecision: 4
}

module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    contentBase: [path.resolve(__dirname, './node_modules/gif.js/dist')],
    proxy: {
      '/app': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true
      }
    }
  },

  vueLoader: {
    postcss: [
      require('postcss-prepend-imports')({
        path: path.resolve(__dirname, './src/assets/css'),
        files: ['vars.css']
      }),
      require('postcss-import')(),
      require('postcss-cssnext')({
        autoprefixer: {
          browsers: ['last 2 versions', 'Android >= 4.1']
        }
      }),
      require('postcss-write-svg')(),
      require('postcss-px2rem')(px2remOptions)
    ]
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new BundleAnalyzerPlugin())
      // mutate config for production...
    } else {
      // mutate for development...
    }
  },

  css: {
    extract: false
  },

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath(assetsDomain)
    }

    config.module
      .rule('jade')
      .test(/\.jade$/)
      .use('jade')
      .loader('jade-loader')

    config.plugin('html').tap(args => {
      const options = args[0]

      options.template = path.resolve(__dirname, './public/template.jade')
      options.title = 'GIF编辑器'

      return args
    })
  }
}
