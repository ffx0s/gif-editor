/* eslint-env node */
import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'
import { isDev } from '@/config'

import edit from './modules/edit'
import like from './modules/like'
import side from './modules/side'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    edit,
    like,
    side
  },
  strict: isDev
  // plugins: isDev ? [createLogger()] : []
})
