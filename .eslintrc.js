module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  env: {
    browser: true
  },
  // 解决 import 报错问题
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // function foo() {} => function foo () {} 有bug，vue文件无效
    // 'space-before-function-paren': [
    //   'error',
    //   {
    //     anonymous: 'always',
    //     named: 'always',
    //     asyncArrow: 'always'
    //   }
    // ],
    // 使用单引号
    quotes: ['error', 'single'],
    // 不加分号
    semi: ['error', 'never']
  },
  globals: {
    wx: true
  }
}
