// 是否支持 webp 格式
export const isSupportWebp = (function() {
  let elem = document.createElement('canvas')
  const isSupport =
    elem.getContext && elem.getContext('2d')
      ? elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
      : false
  elem = null

  return isSupport
})()

export const browser = (function() {
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

export const serialize = data => {
  return Object.keys(data)
    .map(keyName => {
      return keyName + '=' + data[keyName]
    })
    .join('&')
}

export const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export function endcodeJsonStringify(data) {
  return encodeURIComponent(JSON.stringify(data))
}

// 是否支持 passive 属性
export let supportsPassive = false

try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true
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
    supportsPassive ? options || { passive: true } : false
  )
}

export let viewWidth = (() => {
  let timer = null

  addListener(window, 'resize', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      viewWidth = document.documentElement.clientWidth
    }, 300)
  })

  return document.documentElement.clientWidth
})()
