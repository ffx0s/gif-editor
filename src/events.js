/**
 * 全局事件
 */

import Vue from 'vue'
import store from '@/store'
import { fixedSwipeBack, _isForward } from '@/util'

const events = new Vue()
export default events

// 解决单页过场动画 IOS 侧滑问题
const status = {}

fixedSwipeBack(status)

// 页面切换方向控制
events.$on(
  'UPDATE_DIRECTION',
  (function() {
    return function(to, from) {
      store.commit('updateDirection', {
        direction: _isForward(to, from)
          ? status.go ? '' : 'forward'
          : status.back ? '' : 'reverse'
      })
      status.reset()
    }
  })()
)
