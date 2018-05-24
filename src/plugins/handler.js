import {
  addListener,
  removeListener,
  noop,
  containsPoint
} from '@/utils/shared'
import { POINTER_DOWN, POINTER_MOVE, POINTER_UP } from '@/utils/constants'
import EventEmitter from '@/plugins/eventEmitter'

/**
 * 事件处理器
 */
export default class Handler extends EventEmitter {
  constructor(options = {}) {
    super()

    const that = this

    that.each = options.each || noop
    that.last = {}
    that.elementId = null
    that.isMoving = false
    that.touchDelay = 3

    // 绑定上下文
    ;['pointdown', 'pointmove', 'pointup'].forEach(name => {
      that[name] = that[name].bind(that)
    })
  }

  bind(el) {
    const that = this

    that.el = el
    that.setRatio()
    addListener(that.el, POINTER_DOWN, that.pointdown, { passive: false })
    return that
  }

  setRatio() {
    const that = this
    that.rect = that.el.getBoundingClientRect()
    that.ratio =
      that.el.tagName === 'CANVAS' ? that.el.width / that.rect.width : 1
  }

  pointdown(e) {
    e.preventDefault()

    const that = this
    const touches = e.touches

    if (touches) {
      if (touches.length === 2) {
        that.pinchstart(touches)
      } else if (touches.length === 1) {
        that.dragstart(touches[0])
      }
    } else {
      that.dragstart(e)
    }

    addListener(document, POINTER_MOVE, that.pointmove, { passive: false })
    addListener(document, POINTER_UP, that.pointup)
  }

  pointmove(e) {
    e.preventDefault()

    const that = this
    const touches = e.touches

    if (touches) {
      if (touches.length === 2) {
        that.pinchmove(touches)
      } else if (touches.length === 1) {
        that.dragmove(touches[0])
      }
    } else {
      that.dragmove(e)
    }
  }

  pointup() {
    const that = this

    removeListener(document, POINTER_MOVE, that.pointmove)
    removeListener(document, POINTER_UP, that.pointup)

    that.emit('onpointerup', that.isMoving, that.elementId)

    that.elementId = null
    that.isMoving = false
  }

  dragstart(point) {
    const that = this

    that.last.move = {
      x: (point.clientX - that.rect.left) * that.ratio,
      y: (point.clientY - that.rect.top) * that.ratio
    }
    that.touchDelay = 3

    that.each((element, id) => {
      if (containsPoint(element, that.last.move.x, that.last.move.y)) {
        that.elementId = id
      }
    })
    that.emit('onpointerdown', { ...that.last.move, id: that.elementId })
  }

  dragmove(point) {
    const that = this
    const move = {
      x: (point.clientX - that.rect.left) * that.ratio,
      y: (point.clientY - that.rect.top) * that.ratio
    }
    const x = move.x - that.last.move.x
    const y = move.y - that.last.move.y

    that.last.move = move

    // 延迟防止手误操作
    if (that.touchDelay) {
      that.touchDelay--
      return
    }

    that.isMoving = true

    that.emit('onpointermove', {
      move,
      x,
      y,
      id: that.elementId
    })
  }

  pinchstart() {}
  pinchmove() {}
}
