import * as Elements from '../elements'
import { firstToUpperCase } from '@/utils/shared'

class BaseAction {
  constructor(element) {
    this.id = element.ID
    this.type = element.TYPE
    this.props = element.getProps()
  }
  add(layer) {
    const element = layer.addElement(
      new Elements[(firstToUpperCase(this.type))](this.props),
      this.id
    )

    element.draw(layer.mainCtx)
  }
  delete(layer) {
    layer.removeElement(this.id)
    layer.redraw()
  }
}

export class Add extends BaseAction {
  constructor(element) {
    super(element)
  }
  undo(editor) {
    this.delete(editor.layer)
  }
  redo(editor) {
    this.add(editor.layer)
  }
}

export class Delete extends BaseAction {
  constructor(element) {
    super(element)
  }
  undo(editor) {
    this.add(editor.layer)
  }
  redo(editor) {
    this.delete(editor.layer)
  }
}

export class Modify {
  constructor(element, prevProps) {
    this.id = element.ID
    this.newProps = element.getProps()
    this.prevProps = prevProps
  }
  undo(editor) {
    const element = editor.layer.getElement(this.id)
    element.setProps(this.prevProps)
    editor.layer.redraw()
  }
  redo(editor) {
    const element = editor.layer.getElement(this.id)
    element.setProps(this.newProps)
    editor.layer.redraw()
  }
}

// 切换帧
export class SwitchFrmae {
  constructor(originIndex, newIndex) {
    this.originIndex = originIndex
    this.newIndex = newIndex
  }
  undo(editor) {
    editor.gif.jump(this.originIndex, 'absolute')
  }
  redo(editor) {
    editor.gif.jump(this.newIndex, 'absolute')
  }
}
