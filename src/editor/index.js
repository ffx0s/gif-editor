import Builder from 'gif.js'
import Gif from './cores/gif'
import Layer from './cores/layer'
import History from './cores/history'
import * as Actions from './cores/mainActions'
import { isProduction } from '@/config'
import { noop, firstToUpperCase } from '@/utils/shared'

export default class Editor {
  constructor(options) {
    this.el = options.el
    this.gif = new Gif()
    this.layer = new Layer()
    this.layer._getFrameIndex = () => this.gif.frameIndex
    this.history = new History()
  }
  init() {
    const that = this

    that.layer.init()
    that.gif.init()

    that.gif.on('frameIndex', that.layer.redraw.bind(that.layer))
    that.gif.once('ready', that.render.bind(that))
    that.gif.on('ready', () => {
      that.layer.setSize(that.gif.canvas.width, that.gif.canvas.height)
    })

    return that
  }
  render() {
    this.el = document.querySelector(this.el)
    this.gif.render(this.el)
    this.layer.render(this.el)
  }
  destory() {
    this.gif.pause()
    this.gif.destory(this.el)
    this.layer.destory(this.el)
  }
  build() {
    const that = this
    const framesLength = that.gif.frames.length
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    const options = {
      workers: 2,
      quality: 10
    }

    if (isProduction) {
      // options.workerScript = assetsDomain + 'gif.worker.js'
      options.workerScript = 'https://gif.webfed.cn/gif.worker.js'
    }
    if (!that.builder) {
      that.builder = new Builder(options)
      
      that.builder.on('finished', blob => {
        that.gif.emit('finished', URL.createObjectURL(blob))
        that.builder.frames.length = 0
        that.builder.imageParts.length = 0
        that.builder.options.width = null
        that.builder.options.height = null
        that.builder.abort()
        canvas = null
        ctx = null
      })

      that.builder.on('progress', value => {
        that.gif.emit('progress', value)
      })
    }

    const width = (canvas.width = that.gif.canvas.width)
    const height = (canvas.height = that.gif.canvas.height)

    for (let i = 0; i < framesLength; i++) {
      ctx.clearRect(0, 0, width, height)
      ctx.putImageData(that.gif.frames[i].data, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      that.layer.eachElements(element => {
        if (element.$type === 'global' || element.$frameIndex === i) {
          element.draw(ctx)
        }
      })
      ctx.globalCompositeOperation = 'destination-over'
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, width, height)

      const imageData = ctx.getImageData(0, 0, width, height)

      that.builder.addFrame(imageData, {
        delay: that.gif.frames[i].delay ? that.gif.frames[i].delay * 10 : 100
      })
    }

    that.builder.render()
  }
  reset() {
    this.gif.reset()
    this.layer.reset()
    this.history.reset()
  }
  addTool(name, toolFn) {
    if (this.layer.tools[name]) return
    const tool = {
      controller: {},
      handler: {}
    }

    Object.assign(tool, toolFn(this))

    tool.handler = Object.assign(
      {
        onpointerdown: noop,
        onpointermove: noop,
        onpointerup: noop
      },
      tool.handler
    )

    this.layer.tools[name] = tool

    return this
  }
  useTool(name) {
    if (!this.layer.tools[name]) return
    this.changeAction(name)
    return this.layer.tools[name].controller
  }
  changeAction(name) {
    this.layer.handler.emit('onaction', name)
  }
  addRecord({ action, info }) {
    const length = this.history.stack.length

    if (!info) {
      info = { frameIndex: this.gif.frameIndex }
    }

    if (length) {
      // 跳帧操作需要在前面加入一条跳帧记录
      const lastIndex = this.history.stack[length - 1].info.frameIndex

      if (lastIndex !== info.frameIndex) {
        this.history.push({
          action: new Actions.SwitchFrmae(lastIndex, info.frameIndex)
        })
      }
    }

    this.history.push({ action, info })
  }
  record(type, element, prevProps) {
    type = firstToUpperCase(type)

    if (Actions[type]) {
      const record = {
        action: new Actions[type](element, prevProps)
      }

      if (typeof element.$frameIndex !== 'undefined') {
        record.info = { frameIndex: element.$frameIndex }
      }

      this.addRecord(record)
    }
  }
}
