import EventEmitter from '@/plugins/eventEmitter'

/**
 * 撤销、重做历史记录
 */
export default class History extends EventEmitter {
  constructor() {
    super()
    // 记录栈
    this.stack = []
    // 当前指针
    this.index = 0
    this.disableUndo = true
    this.disableRedo = true
    // this.max = 30
  }
  push({ action, info = {} }) {
    // if (this.index > this.max) {}
    this.stack[this.index++] = { action, info }
    this.stack.length = this.index
    this.input()
  }
  undo() {
    if (this.index > 0) {
      this.stack[--this.index].action.undo(...arguments)
      this.input()
    }
  }
  redo() {
    if (this.index < this.stack.length) {
      this.stack[this.index++].action.redo(...arguments)
      this.input()
    }
  }
  input() {
    this.disableUndo = this.index <= 0
    this.disableRedo = this.index >= this.stack.length
    this.emit('input', this)
  }
  each(callback, index) {
    index = typeof index !== 'undefined' ? index : this.index

    for (let i = 0; i < index; i++) {
      callback(this.stack[i], i)
    }
  }
  reset() {
    this.stack.length = 0
    this.index = 0
    this.disableUndo = true
    this.disableRedo = true
    this.input()
  }
}
