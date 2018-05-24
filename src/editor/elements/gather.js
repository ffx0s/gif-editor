export class Gather {
  constructor(props) {
    Object.assign(this, props)
    this.TYPE = 'gather'
  }
  draw(ctx) {
    let length = this.elements.length
    for (let i = 0; i < length; i++) {
      this.elements[i].draw(ctx)
    }
  }
  setProps(props) {
    Object.assign(this, props)
  }
  getProps() {
    return Object.assign({}, this)
  }
}
