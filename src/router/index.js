import Vue from 'vue'
import Router from 'vue-router'
import events from '@/events'
import { loading, _scrollTo, _saveScrollTop } from '@/utils/page'

Vue.use(Router)

function loadRoute(name) {
  return function() {
    return import('../views/' + name)
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { keepAlive: true, title: '上传GIF' },
    component: loadRoute('Home')
  },
  {
    path: '/gallery',
    name: 'gallery',
    meta: { keepAlive: true, title: 'gallery' },
    component: loadRoute('Gallery')
  },
  {
    path: '/editor',
    name: 'editor',
    meta: { keepAlive: true, title: 'GIF编辑器' },
    component: loadRoute('Editor')
  },
  {
    path: '/404',
    name: '404',
    meta: { keepAlive: true, title: '404' },
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

  // 页面方向切换更新
  events.emit('UPDATE_DIRECTION', to, from)
  next()
})

router.afterEach(to => {
  loading({ show: false })

  // 页面统计
  events.emit('STATS', to)
})

Vue.mixin({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 进入当前页面的路由时，滚动到之前的位置
      _scrollTo(vm, to)
    })
  },
  beforeRouteLeave(to, from, next) {
    // 离开当前页面的路由时，保存页面滚动位置
    _saveScrollTop(this, from)
    next()
  }
})

export default router
