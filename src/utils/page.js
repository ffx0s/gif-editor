import store from '@/store'
import { browser, viewWidth, viewHeight, addListener } from '@/utils/shared'

export const loading = (function loadingWrap() {
  const el = document.getElementById('loading')

  function getStatus(value) {
    return value ? 'show' : 'hide'
  }

  return function loadingInner(options) {
    const curStatus = getStatus(el.className.indexOf('hide') === -1)
    const nextStatus = getStatus(options.show)
    const background = options.show && options.background ? 'background' : ''

    // 如果 loading 当前处于显示状态则不处理
    if (curStatus === 'show' && nextStatus === 'show' && !options.replace)
      return

    el.className = `loading ${background} ${nextStatus}`
  }
})()

// 解决微信上下滑出现黑底背景问题
export function fixedWXScroll(scrollEl, targetSelector) {
  if (!browser.weixin) return

  const offset = 5
  let startY = 0
  let targetEl = null

  addListener(scrollEl, 'touchstart', e => {
    startY = e.touches[0].pageY
    targetEl = scrollEl.querySelector(targetSelector)
  })

  addListener(
    scrollEl,
    'touchmove',
    e => {
      const y = startY - e.touches[0].pageY
      const pullDownAction = y < -offset
      const pullUpAction = y > offset

      if (!targetEl) return

      if (
        (pullDownAction && targetEl.scrollTop <= 0) ||
        (pullUpAction &&
          Math.floor(targetEl.scrollHeight - viewHeight) <= targetEl.scrollTop)
      ) {
        e.preventDefault()
      }
    },
    { passive: false }
  )
}

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

// 禁止移动端双击缩放
export function disabledScale() {
  let lastTouchEnd = 0
  document.addEventListener(
    'touchend',
    e => {
      let now = Date.now()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    },
    false
  )
}

function getScrollEl(vm) {
  return vm.$el.querySelector('.page-content')
}

export function scrollTo(vm, top) {
  const el = getScrollEl(vm)
  if (el) {
    el.scrollTop = top
  }
}

// 进入当前页面的路由时，滚动到之前的位置
export function _scrollTo(vm, to) {
  const page = store.state.page.historyPage[to.fullPath] || {}
  let top = page.scrollTop || 0
  // 路由带hash的优先
  let hash = to.hash || page.hash

  // 优先滚动到有hash的元素上
  if (hash) {
    const el = vm.$el.querySelector(hash)
    top = el ? el.offsetTop : 0
  }

  scrollTo(vm, top)
}

// 离开当前页面的路由时，保存页面滚动位置
export function _saveScrollTop(vm, from) {
  const el = getScrollEl(vm)

  store.commit('saveScrollTop', {
    path: from.fullPath,
    scrollTop: el ? el.scrollTop : 0
  })
}

// 判断当前路由是否是前进
export const _isForward = (function _isForwardWrap() {
  // 如果在这个列表中，始终采用从左到右的滑动效果，首页比较适合用这种方式
  const ALWAYS_BACK_PAGE = []

  // to 如果在这个列表中，始终采用从右到左的滑动效果
  const ALWAYS_FORWARD_PAGE = []

  // 历史记录，记录访问过的页面的 fullPath
  const HISTORY_STACK = []

  return function _isForwarInner(to, from) {
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
