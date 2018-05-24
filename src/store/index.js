/* eslint-env node */
require('es6-promise').polyfill() // Fixed Android 4.1

import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'
import { isDev } from '@/config'

import page from './modules/page'
import edit from './modules/edit'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    page,
    edit
  },
  strict: isDev
  // plugins: isDev ? [createLogger()] : []
})
