import { browser } from '@/util'

// 解决 Android 虚拟键盘挡住 input 问题
export const scrollIntoView = {
  bind: function(el) {
    if (browser.ios && !el.scrollIntoView) return

    el.addEventListener(
      'focus',
      function() {
        setTimeout(() => {
          el.scrollIntoView()
        }, 300)
      },
      false
    )
  }
}
