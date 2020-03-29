import Handler from '@/plugins/handler'

const hasOwnProperty = Object.prototype.hasOwnProperty

export class Border {
  constructor() {
    const that = this

    that.padding = 10
    that.ratio = 1
    that.offsetLeft = 0
    that.offsetTop = 0
    that.zoom = new Handler()
  }
  render(container) {
    this.create()
    this.bindEvent()
    container.appendChild(this.el)
  }
  create() {
    const div = document.createElement('div')
    div.innerHTML = Border.template

    this.el = div.querySelector('div:first-child')
  }
  bindEvent() {
    const point = this.el.querySelector('.zoom')

    this.zoom.bind(point)
  }
  draw(rect) {
    const that = this
    that.styles = {
      width: rect.width * that.ratio + that.padding * 2,
      height: rect.height * that.ratio + that.padding * 2,
      left: rect.x * that.ratio - that.padding + that.offsetLeft,
      top: rect.y * that.ratio - that.padding + that.offsetTop
    }
    if (rect.ID) {
      that.targetId = rect.ID
    }
    that.setStyle()
  }
  show() {
    this.el.style.display = 'block'
  }
  hide() {
    this.el.style.display = 'none'
  }
  setStyle() {
    let styles = 'display: block;'
    for (let prop in this.styles) {
      if (hasOwnProperty.call(this.styles, prop)) {
        styles += `${prop}:${this.styles[prop]}px;`
      }
    }
    this.el.style.cssText = styles
  }
  setOffset(el) {
    const rect = el.getBoundingClientRect()
    this.ratio = rect.width / el.width

    this.offsetLeft = rect.left
    this.offsetTop = rect.top
  }
  static template = '<div class="editor-action-border">' +
    '<button class="icon-btn zoom"><i class="iconfont icon-Zoom"></i></button>' +
    '</div>'
}
