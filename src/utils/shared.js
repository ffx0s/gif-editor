// 是否支持 webp 格式
export const isSupportWebp = (function isSupportWebp() {
  let elem = document.createElement('canvas')
  const isSupport =
    elem.getContext && elem.getContext('2d')
      ? elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
      : false
  elem = null

  return isSupport
})()

export const isBase64Image = src => src.indexOf(';base64,') > 0

export const browser = (function browser() {
  const u = navigator.userAgent

  return {
    // Chrome
    chrome: u.indexOf('Chrome') > -1 && u.indexOf('Edge') === -1,
    // IE
    trident: u.indexOf('Trident') > -1,
    // webkit 内核(Chrome , Safari)
    webkit: u.indexOf('AppleWebKit') > -1,
    // 火狐
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
    // 是否为移动终端
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    // 是否为mac
    mac: u.indexOf('Mac') > -1,
    // ios终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    // android终端或者uc浏览器
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    // 是否为iPhone
    iPhone: u.indexOf('iPhone') > -1,
    iPad: u.indexOf('iPad') > -1,
    weixin: u.indexOf('MicroMessenger') > -1
  }
})()

export function serialize(data) {
  return Object.keys(data)
    .map(keyName => {
      return keyName + '=' + data[keyName]
    })
    .join('&')
}

export function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export function noop() {}

export const isSupportTouch = 'ontouchend' in document ? true : false

export let viewHeight = document.documentElement.clientHeight

export let viewWidth = (function _viewWidth() {
  let timer = null

  addListener(window, 'resize', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      viewWidth = document.documentElement.clientWidth
      viewHeight = document.documentElement.clientHeight
    }, 300)
  })

  return document.documentElement.clientWidth
})()

// 是否支持 passive 属性
export let supportsPassive = false

try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true
      return supportsPassive
    }
  })
  window.addEventListener('testPassive', null, opts)
  window.removeEventListener('testPassive', null, opts)
} catch (e) {
  throw ''
}

export function addListener(element, type, fn, options) {
  element.addEventListener(
    type,
    fn,
    supportsPassive
      ? {
          capture: false,
          passive: true,
          once: false,
          ...options
        }
      : !!options
  )
}

export function removeListener(element, type, fn, options) {
  element.removeEventListener(type, fn, options)
}

/**
 * 是否为数字
 * @param {*} value 值
 */
export function isNumber(value) {
  return typeof value === 'number' && value !== Infinity && !isNaN(value)
}

/**
 * 判断对象是否在坐标范围内
 * @param {*} rect 检测对象
 * @param {*} x x坐标
 * @param {*} y y坐标
 */
export function containsPoint(rect, x, y) {
  if (
    rect &&
    isNumber(rect.x) &&
    isNumber(rect.y) &&
    isNumber(rect.width) &&
    isNumber(rect.height) &&
    isNumber(x) &&
    isNumber(y)
  ) {
    return !(
      x < rect.x ||
      x > rect.x + rect.width ||
      y < rect.y ||
      y > rect.y + rect.height
    )
  }
  return false
}

/**
 * 首字母大写
 * @param {String} text 单词
 */
export function firstToUpperCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Converts a color to the RGB string format: 'rgb(r,g,b)' or 'rgba(r,g,b,a)'
 * @param {number|string} color
 * @param {number}        alpha
 * @return {string}
 */
export function colorToRGB(color, alpha) {
  // number in octal format or string prefixed with #
  if (typeof color === 'string' && color[0] === '#') {
    color = window.parseInt(color.slice(1), 16)
  }
  alpha = alpha === undefined ? 1 : alpha
  // parse hex values
  let r = (color >> 16) & 0xff
  let g = (color >> 8) & 0xff
  let b = color & 0xff
  let a = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha
  // only use 'rgba' if needed
  if (a === 1) {
    return `rgb(${r}, ${g}, ${b})`
  } else {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
}

/**
 * 获取当前元素真实滚动节点
 * https://github.com/youzan/vant/blob/dev/packages/utils/scroll.js#L5
 * @param {Element} element 当前节点
 * @param {Element} rootParent 根节点
 */
export function getScrollEventTarget(element, rootParent = window) {
  let currentNode = element
  // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
  while (
    currentNode &&
    currentNode.tagName !== 'HTML' &&
    currentNode.tagName !== 'BODY' &&
    currentNode.nodeType === 1 &&
    currentNode !== rootParent
  ) {
    const overflowY = document.defaultView.getComputedStyle(currentNode)
      .overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return rootParent
}
