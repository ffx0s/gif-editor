import { Text } from '../elements'

export default function(editor) {
  const layer = editor.layer

  let element = null

  function reset() {
    setTimeout(() => {
      element = null
      editor.changeAction(null)
      layer.resetEditCanvas()
      layer.unselectElement()
      layer.clearCanvas('temp')
    })
  }

  const controller = {
    add(props = {}) {
      element = layer.elementController.addElement(new Text(props))
      // 居中画布
      props.x = element.x = (layer.width - element.width) / 2
      props.y = element.y = (layer.height - element.height) / 2

      layer.selectElement(element)
      layer.clearCanvas('temp')
      element.draw(layer.tempCtx)
    },
    restore() {
      reset()
    },
    // 编辑
    modify(props) {
      const prevText = element.text

      element.setProps(props)

      // 修改了文字需要更新宽高
      if (props.text && props.text !== prevText) {
        element.setSize()
        layer.selectElement(element)
      }

      layer.clearCanvas('temp')
      element.draw(layer.tempCtx)
    },
    // 保存编辑
    save(props) {
      const element = layer.saveEdits(props)
      editor.record('add', element)
      reset()
    },
    getCurrentElement() {
      return element
    }
  }

  return { controller }
}
