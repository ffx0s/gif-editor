import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import * as filters from '@/utils/filters'
import * as directives from '@/utils/directives'
import View from '@/components/View'
import IconButton from '@/components/IconButton'
import ModalPlugin from '@/components/Modal/plugin'
import TextareaPlugin from '@/components/Textarea/plugin'

Vue.config.productionTip = false

// 注册全局过滤器、指令、组件：

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Vue.component('app-view', View)
Vue.component('icon-button', IconButton)

Vue.use(ModalPlugin)
Vue.use(TextareaPlugin)

new Vue({ router, store, ...App }).$mount('#app')
