import { viewWidth, addListener } from '@/utils/shared'

// 判断当前路由是否是前进
export const isForward = (function isForwardWrap() {
  // 如果在这个列表中，始终采用从左到右的滑动效果，首页比较适合用这种方式
  const ALWAYS_BACK_PAGE = []

  // to 如果在这个列表中，始终采用从右到左的滑动效果
  const ALWAYS_FORWARD_PAGE = []

  // 历史记录，记录访问过的页面的 fullPath
  const HISTORY_STACK = []

  return function isForwarInner(to, from) {
    // to 如果在这个列表中，始终认为是后退
    if (to.name && ALWAYS_BACK_PAGE.indexOf(to.name) !== -1) {
      // 清空历史
      HISTORY_STACK.length = 0
      return false
    }

    if (from.name && ALWAYS_BACK_PAGE.indexOf(from.name) !== -1) {
      // 如果是从 ALWAYS_BACK_PAGE 过来的，那么永远都是前进
      HISTORY_STACK.push(to.fullPath)
      return true
    }

    if (to.name && ALWAYS_FORWARD_PAGE.indexOf(to.name) !== -1) {
      // to 如果在这个列表中，始终认为是前进
      HISTORY_STACK.push(to.fullPath)
      return true
    }

    // 根据 fullPath 判断当前页面是否访问过，如果访问过，则属于返回
    let index = HISTORY_STACK.indexOf(to.fullPath)

    if (index !== -1) {
      HISTORY_STACK.length = index + 1
      return false
    }

    // 将 to.fullPath 加到栈顶
    HISTORY_STACK.push(to.fullPath)

    return true
  }
})()

// 解决单页过场动画 IOS 侧滑问题
export function fixedSwipeBack(status) {
  status.back = false
  status.go = true
  status.reset = () => {
    status.back = false
    status.go = false
  }

  let pointX = 0

  addListener(document, 'touchstart', e => {
    pointX = e.changedTouches[0].clientX
    status.reset()
  })

  addListener(document, 'touchmove', () => {
    const value = viewWidth / 2

    status.go = pointX > value
    status.back = pointX < value
  })

  return status
}

export const page = (function page() {
  // 页面滚动条坐标信息
  const historyPage = {}

  function getScrollEl(vm) {
    return vm.$el.querySelector('.animated-route-view')
  }

  return {
    // 进入当前页面的路由时，滚动到之前的位置
    scrollTo (vm, to) {
      const scrollEl = getScrollEl(vm)

      if (scrollEl) {
        const page = historyPage[to.fullPath] || {}
        const hash = page.hash === '' ? '' : (page.hash || to.hash)
        let top = page.scrollTop || 0
  
        // 优先滚动到有hash的元素上
        if (hash) {
          const el = vm.$el.querySelector(hash)
          if (el) {
            top = el.offsetTop
          }
        }
  
        scrollEl.scrollTop = top
      }
    },
    // 离开当前页面的路由时，保存页面滚动位置
    saveScrollTop(vm, from) {
      const scrollEl = getScrollEl(vm)

      if (scrollEl) {
        const path = from.fullPath
  
        if (!historyPage[path]) {
          historyPage[path] = {}
        }
        historyPage[path].scrollTop = scrollEl ? scrollEl.scrollTop : 0
        historyPage[path].hash = ''
      }
    }
  }
})()
