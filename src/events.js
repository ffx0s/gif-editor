/**
 * 全局事件
 */

import Vue from 'vue'
import store from '@/store'
import { addListener, viewWidth } from '@/util'

const events = new Vue()

export default events

// 页面切换方向控制
events.$on(
  'UPDATE_DIRECTION',
  (function() {
    // 如果在这个列表中，始终采用从左到右的滑动效果，首页比较适合用这种方式
    const ALWAYS_BACK_PAGE = ['home']

    // to 如果在这个列表中，始终采用从右到左的滑动效果
    const ALWAYS_FORWARD_PAGE = ['']

    // 历史记录，记录访问过的页面的 fullPath
    const HISTORY_STACK = []

    let pointX = 0
    let isSwipeBack = false
    let isSwipeGo = false

    // 判断当前是否是前进，true 表示是前进，否则是回退
    function isForward(to, from) {
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

    // 解决 IOS 侧滑页面动画问题

    addListener(document, 'touchstart', e => {
      pointX = e.changedTouches[0].clientX
      isSwipeGo = false
      isSwipeBack = false
    })

    addListener(document, 'touchmove', () => {
      const value = viewWidth / 2

      isSwipeGo = pointX > value
      isSwipeBack = pointX < value
    })

    return function(to, from) {
      store.commit('updateDirection', {
        direction: isForward(to, from)
          ? isSwipeGo ? '' : 'forward'
          : isSwipeBack ? '' : 'reverse'
      })
    }
  })()
)
