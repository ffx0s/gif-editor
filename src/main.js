import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import * as filters from '@/filters'
import * as directives from '@/directives'
import View from '@/components/View'

Vue.config.productionTip = false

// 注册全局过滤器、指令、组件：

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Vue.component('app-view', View)

new Vue({ router, store, ...App }).$mount('#app')
