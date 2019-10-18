import Handler from './handler'

export default class Range {
  constructor({ el, max, min, value, step }) {
    const that = this

    that.progressBar = el.querySelector('.range-current-progress')
    that.point = el.querySelector('.range-button')
    that.width = el.offsetWidth - el.querySelector('.range-point').offsetWidth
    that.max = max
    that.min = min
    that.value = value
    that.step = step || 1
    that.handler = new Handler()
    that.init()
  }

  init() {
    const that = this

    that.handler
      .bind(that.point)
      .on('onpointerdown', that.dragstart.bind(that))
      .on('onpointermove', that.dragmove.bind(that))

    that.calculate()
    that.setValue(that.value)

    return that
  }

  calculate() {
    const that = this
    const count = (that.max - that.min) / that.step
    that.px = count === 0 ? 0 : that.width / count
    that.count = count
  }

  dragstart() {
    const that = this

    that.handler.last.width = that.progressBar.offsetWidth
    that.handler.last.count = 0

    that.handler.emit('dragstart')
  }

  dragmove({ x }) {
    const that = this

    that.handler.last.width += x

    let count = Math.ceil(that.handler.last.width / that.px)

    if (count > that.count) {
      count = that.count
    } else if (count < 0) {
      count = 0
    }

    count += that.min

    if (count !== that.handler.last.count) {
      // that.setValue(count)
      that.handler.emit('change', count * that.step)
    }

    that.handler.last.count = count
  }

  setValue(value) {
    const that = this

    value = Math.min(Math.max(value, that.min), that.max)
    that.progressBar.style.width =
      (value - that.min) / that.step * that.px + 'px'
    that.value = value
  }

  setMax(value) {
    this.max = value
    this.calculate()
  }
}
