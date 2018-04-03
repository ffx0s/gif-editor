/* eslint-env node */

const path = require('path')

const px2remOptions = {
  remUni: 75,
  remPrecision: 8
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

    // scss px2rem
    // config.module
    //   .rule('scss')
    //   .test(/\.scss$/)
    //   .use('scss')
    //   .loader('px2rem-loader')
    //   .options(px2remOptions)

    // *.vue px2rem
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.postcss = [require('postcss-px2rem')(px2remOptions)]
        // options.loaders.scss.push({
        //   loader: 'px2rem-loader',
        //   options: px2remOptions
        // })
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
