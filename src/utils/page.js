import { browser, viewHeight, addListener } from '@/utils/shared'

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
