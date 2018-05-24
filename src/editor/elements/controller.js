export default class ElementController {
  constructor() {
    // 元素集合
    this.elements = {}
    // 元素添加计数
    this.count = 0
    // 元素层级关系
    this.zindex = []
  }
  getElement(id) {
    return this.elements[id]
  }
  getElements() {
    const elements = []
    this.eachElements(element => {
      elements.push(element)
    })
    return elements
  }
  addElement(element, id) {
    id = id || ++this.count
    element.ID = id

    this.elements[id] = element
    this.zindex.push(id)
    return element
  }
  removeElement(id) {
    const element = this.elements[id]
    if (element) {
      delete this.elements[id]
      this.zindex.splice(this.zindex.indexOf(id), 1)
    }
  }
  eachElements(callback) {
    const length = this.zindex.length

    for (let i = 0; i < length; i++) {
      const id = this.zindex[i]
      if (callback(this.elements[id], id)) {
        break
      }
    }
  }
  hasElements() {
    return !!this.zindex.length
  }
  reset() {
    this.elements = {}
    this.count = 0
    this.zindex.length = 0
  }
}
