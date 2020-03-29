const path = require('path')
const { assetsDomain } = require('./src/config')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? assetsDomain : '/',
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    contentBase: [path.resolve(__dirname, './node_modules/gif.js/dist')],
    proxy: {
      '/app': {
        target: 'https://biaoqing233.com',
        changeOrigin: true
      }
    }
  },
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-preset-env')({
            stage: 3,
            features: {
              'nesting-rules': true
            }
          }),
          require('postcss-px2rem')({
            remUnit: 16,
            remPrecision: 4
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      const options = args[0]
      
      options.template = '!!pug-loader!' + path.resolve(__dirname, './public/template.pug')

      return args
    })
  }
}
