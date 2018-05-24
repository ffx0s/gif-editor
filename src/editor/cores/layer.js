import Handler from '@/plugins/handler'
import History from './history'
import * as Actions from './editActions'
import { Border, Gather } from '../elements'
import ElementController from '../elements/controller'
import { firstToUpperCase } from '@/utils/shared'

/**
 * 图层
 */
export default class Layer extends ElementController {
  constructor() {
    super()
    const that = this

    that.canvas = null
    that.mainCtx = null
    that.width = null
    that.height = null

    that.handler = new Handler({
      // 遍历元素，用于事件触发时确定选取的元素是哪个
      each(callback) {
        that.elementController.eachElements(element => {
          callback(element, element.ID)
        })
      }
    })

    that.border = new Border()
    that.history = new History()
    // 编辑层元素控制器
    that.elementController = new ElementController()
    that.tools = {}
    that.currentElement = null
    that.currentAction = null
  }
  init() {
    const that = this

    that.create()
    that.addEventHandler()

    return that
  }
  create() {
    const that = this

    // 主画布，存储所有已保存的操作的结果
    that.canvas = document.createElement('canvas')
    that.canvas.className = 'editor-main'
    that.mainCtx = that.canvas.getContext('2d')

    // 临时画布，用于元素的位移/属性发生变化时的绘制，变化结束清空画布
    that.tempCanvas = document.createElement('canvas')
    that.tempCanvas.className = 'editor-temp'
    that.tempCtx = that.tempCanvas.getContext('2d')

    // 编辑画布，存储当前操作的所有元素的集合，当前操作结束后清空画布
    that.editCanvas = document.createElement('canvas')
    that.editCanvas.className = 'editor-edit'
    that.editCanvas.style.pointerEvents = 'auto'
    that.editCtx = that.editCanvas.getContext('2d')
  }
  render(el) {
    el.appendChild(this.canvas)
    el.appendChild(this.editCanvas)
    el.appendChild(this.tempCanvas)
    this.border.render(el)
  }
  destory(el) {
    el.removeChild(this.canvas)
    // ...待完善
  }
  reset() {
    this.clearCanvas('main')
    this.clearCanvas('temp')
    this.clearCanvas('edit')
    this.history.reset()
    this.elementController.reset()
    super.reset()
  }
  setSize(width, height) {
    const that = this
    that.width = that.canvas.width = that.tempCanvas.width = that.editCanvas.width = width
    that.height = that.canvas.height = that.tempCanvas.height = that.editCanvas.height = height
    this.border.setOffset(this.canvas)
    this.handler.setRatio()
  }
  selectElement(element) {
    const that = this

    // 获取并设置当前元素状态
    that.currentElement =
      typeof element === 'object' ? element : that.getElement(element)

    // 绘制选中框
    that.border.draw(that.currentElement)
  }
  unselectElement() {
    const that = this

    that.currentElement = null
    that.border.hide()
  }
  /**
   * 重绘显示层元素
   */
  redraw() {
    const that = this

    that.mainCtx.clearRect(0, 0, that.width, that.height)

    that.eachElements(element => {
      if (that.isValidElement(element)) {
        element.draw(that.mainCtx)
      }
    })
  }
  /**
   * 重绘编辑层元素
   */
  redrawEditCanvas() {
    const that = this

    that.editCtx.clearRect(0, 0, that.width, that.height)

    that.elementController.eachElements(element => {
      element.draw(that.editCtx)
    })
  }
  saveEdits(props) {
    props = Object.assign({ $type: 'global' }, props)

    const elements = this.elementController.getElements()
    let element = null

    if (elements.length > 1) {
      element = this.addElement(new Gather({ elements }))
    } else {
      element = this.addElement(elements[0])
    }

    if (!props.$type) {
      props.$frameIndex = this._getFrameIndex()
    }

    element.setProps(props)
    element.draw(this.mainCtx)

    return element
  }
  isValidElement(element) {
    const frameIndex = this._getFrameIndex()
    return (
      element &&
      (element.$frameIndex === frameIndex || element.$type === 'global')
    )
  }
  clearCanvas(name) {
    this[`${name}Ctx`].clearRect(0, 0, this.width, this.height)
  }
  resetEditCanvas() {
    this.elementController.reset()
    this.history.reset()
    this.clearCanvas('edit')
  }
  record(type, element, prevProps) {
    type = firstToUpperCase(type)
    if (Actions[type]) {
      this.history.push({
        action: new Actions[type](element, prevProps)
      })
    }
  }
  addEventHandler() {
    const that = this

    that.border.zoom.on('onpointerdown', that.tools.zoom.handler.onpointerdown)
    that.border.zoom.on('onpointermove', that.tools.zoom.handler.onpointermove)

    that.handler
      .bind(that.editCanvas)
      .on('onpointerdown', onpointerdown)
      .on('onpointermove', onpointermove)
      .on('onpointerup', onpointerup)
      .on('onaction', onaction)

    function onpointerdown() {
      that.tools.move.handler.onpointerdown(...arguments)
      that.currentAction &&
        that.tools[that.currentAction].handler.onpointerdown(...arguments)
    }
    function onpointermove() {
      that.tools.move.handler.onpointermove(...arguments)
      that.currentAction &&
        that.tools[that.currentAction].handler.onpointermove(...arguments)
    }
    function onpointerup() {
      that.currentAction &&
        that.tools[that.currentAction].handler.onpointerup(...arguments)
      that.tools.move.handler.onpointerup(...arguments)
    }
    function onaction(action) {
      that.currentAction = action
    }
  }
}
