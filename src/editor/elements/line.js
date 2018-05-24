export class Line {
  constructor(props) {
    Object.assign(this, Line.defaultProps, props)
  }
  moveTo(ctx, x, y) {
    this.points = []
    this.setStyle(ctx)
    ctx.beginPath()
    ctx.moveTo(x, y)
    this.pushPoint(x, y)
  }
  lineTo(ctx, x, y) {
    ctx.lineTo(x, y)
    ctx.stroke()
    this.pushPoint(x, y)
  }
  pushPoint(x, y) {
    this.points.push(x)
    this.points.push(y)
  }
  eachPoint(callback) {
    const length = this.points.length
    let i = 2

    while (i < length) {
      callback(this.points[i], this.points[i + 1])
      i += 2
    }
  }
  setStyle(ctx) {
    ctx.strokeStyle = this.strokeStyle
    ctx.lineWidth = this.lineWidth
    // 线两端样式圆滑
    ctx.lineJoin = ctx.lineCap = 'round'

    // 平滑边缘，抗锯齿
    // ctx.shadowBlur = 1
    // ctx.shadowColor = 'rgb(0, 0, 0)'
  }
  setProps(props) {
    Object.assign(this, props)
  }
  getProps() {
    return Object.assign({}, this)
  }
  draw(ctx) {
    if (this.points.length > 1) {
      ctx.save()
      this.setStyle(ctx)
      ctx.beginPath()
      ctx.moveTo(this.points[0], this.points[1])
      this.eachPoint((x, y) => {
        ctx.lineTo(x, y)
      })
      ctx.stroke()
      ctx.restore()
    }
  }
  static defaultProps = {
    TYPE: 'line',
    strokeStyle: '#000',
    lineWidth: 2
  }
}
