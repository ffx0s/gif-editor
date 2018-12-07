import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VueLazyload from 'vue-lazyload'

import * as filters from '@/utils/filters'
import * as directives from '@/utils/directives'

import AppView from '@/components/View'
import IconButton from '@/components/IconButton'
import VRow from '@/components/Row'
import VCol from '@/components/Col'
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

Vue.component('AppView', AppView)
Vue.component('IconButton', IconButton)
Vue.component('VRow', VRow)
Vue.component('VCol', VCol)

Vue.use(ModalPlugin)
  .use(TextareaPlugin)
  .use(VueLazyload, {
    error: require('@/assets/images/broken_image.svg'),
    attempt: 1,
    filter: {
      progressive(listener) {
        listener.src = filters.setImg(listener.src)
      }
    }
  })

new Vue({ router, store, ...App }).$mount('#app')
