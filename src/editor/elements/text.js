export class Text {
  constructor(props) {
    Object.assign(this, Text.defaultProps, props)
    this.setSize()
  }
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.font = this.font
    ctx.fillStyle = this.fillStyle
    ctx.textAlign = this.textAlign
    ctx.textBaseline = this.textBaseline
    ctx.fillText(this.text, 0, 0)
    ctx.restore()

    return this
  }
  setSize() {
    this.width = Text.getTextWidth(this.text, this.font)
    this.height = this.getFontSize()
  }
  getFontSize() {
    return parseInt(this.font.split(' ')[0])
  }
  setFontSize(size) {
    const items = this.font.split(' ')
    items[0] = size + 'px'
    this.font = items.join(' ')
  }
  setProps(props) {
    if (typeof props.height === 'number' && props.height !== this.height) {
      this.setFontSize(props.height)
    }
    Object.assign(this, props)
  }
  getProps() {
    return Object.assign({}, this)
  }

  static defaultProps = {
    TYPE: 'text',
    MOVE: true,
    x: 0,
    y: 0,
    font: '26px SimHei bold',
    fillStyle: '#000',
    textAlign: 'start',
    textBaseline: 'hanging'
  }

  static getTextWidth(text, font) {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    ctx.font = font
    ctx.fillText(text, 0, 0)
    const width = ctx.measureText(text).width
    ctx = null
    canvas = null
    return width
  }
}
