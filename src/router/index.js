import Vue from 'vue'
import Router from 'vue-router'
import events from '@/events'

Vue.use(Router)

const Page1 = loadRouteAsync('Page1')
const Page2 = loadRouteAsync('Page2')
const Page3 = loadRouteAsync('Page3')
const PageNotFound = loadRouteAsync('PageNotFound')

// 异步加载页面
function loadRouteAsync(name) {
  return function() {
    return import('../views/' + name)
  }
}

// 路由文件
const routes = [
  {
    path: '/',
    name: 'page1',
    meta: { keepAlive: true, title: 'page1' },
    component: Page1
  },
  {
    path: '/page2',
    name: 'page2',
    meta: { keepAlive: true, title: 'page2' },
    component: Page2
  },
  {
    path: '/page3',
    name: 'page3',
    meta: { keepAlive: true, title: 'page3' },
    component: Page3
  },
  {
    path: '/404',
    name: '404',
    meta: { keepAlive: true, title: '404' },
    component: PageNotFound
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
  // 页面方向切换更新
  events.$emit('UPDATE_DIRECTION', to, from)
  next()
})

export default router
