import * as Elements from '../elements'
import { firstToUpperCase } from '@/utils/shared'

class BaseAction {
  constructor(element) {
    this.id = element.ID
    this.type = element.TYPE
    this.props = element.getProps()
  }
  add(layer) {
    const element = layer.elementController.addElement(
      new Elements[(firstToUpperCase(this.type))](this.props),
      this.id
    )

    element.draw(layer.editCtx)
  }
  delete(layer) {
    layer.elementController.removeElement(this.id)
    layer.redrawEditCanvas()
  }
}

export class Add extends BaseAction {
  constructor(element) {
    super(element)
  }
  undo(layer) {
    this.delete(layer)
  }
  redo(layer) {
    this.add(layer)
  }
}

export class Delete extends BaseAction {
  constructor(element) {
    super(element)
  }
  undo(layer) {
    this.add(layer)
  }
  redo(layer) {
    this.delete(layer)
  }
}
