import Vue from 'vue'
import Router from 'vue-router'
import events from '@/events'
import { loading } from '@/utils/page'

Vue.use(Router)

function loadRoute (name) {
  return function () {
    return import('../views/' + name)
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: '上传GIF' },
    component: loadRoute('Home')
  },
  {
    path: '/editor',
    name: 'editor',
    meta: { title: 'GIF编辑器' },
    component: loadRoute('Editor')
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: loadRoute('PageNotFound')
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

const router = new Router({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  loading({ show: true })
  next()
})

router.afterEach(to => {
  loading({ show: false })
  // 页面统计
  events.emit('STATS', to)
})

export default router
