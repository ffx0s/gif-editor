/**
 * 全局事件
 */

import store from '@/store'
import EventEmitter from '@/plugins/eventEmitter'
import { fixedSwipeBack, _isForward } from '@/utils/page'

const events = new EventEmitter()
const pageStatus = {}

// 解决过场动画 IOS 侧滑问题
fixedSwipeBack(pageStatus)

// 页面切换方向控制
events.on('UPDATE_DIRECTION', (to, from) => {
  store.commit('updateDirection', {
    direction: _isForward(to, from)
      ? pageStatus.go ? '' : 'forward'
      : pageStatus.back ? '' : 'reverse'
  })
  pageStatus.reset()
})

export default events
