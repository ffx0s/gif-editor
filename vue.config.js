/* eslint-env node */

const path = require('path')

const px2remOptions = {
  remUni: 75,
  remPrecision: 4
}

module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false
  },

  chainWebpack: config => {
    config.module
      .rule('jade')
      .test(/\.jade$/)
      .use('jade')
      .loader('jade-loader')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.postcss = [
          require('postcss-import')(),
          require('postcss-cssnext')({
            autoprefixer: {
              browsers: ['last 2 versions', 'Android >= 4.1']
            }
          }),
          require('postcss-write-svg')(),
          require('postcss-px2rem')(px2remOptions)
        ]

        return options
      })

    config.plugin('html').tap(args => {
      const options = args[0]

      options.template = path.resolve(__dirname, './public/template.jade')
      options.title = 'App'

      return args
    })
  }
}
