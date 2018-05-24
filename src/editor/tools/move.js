export default function(editor) {
  const layer = editor.layer

  const isMoveElement = function(layer) {
    return layer.currentElement && layer.currentElement.MOVE
  }

  const handler = {
    onpointerdown({ id }) {
      if (id && layer.currentAction) {
        const element = layer.elementController.getElement(id)

        if (element.MOVE) {
          layer.selectElement(element)
        }
      }
    },
    onpointermove({ x, y }) {
      if (isMoveElement(layer)) {
        layer.currentElement.x += x
        layer.currentElement.y += y
        layer.clearCanvas('temp')
        layer.currentElement.draw(layer.tempCtx)
        layer.border.draw(layer.currentElement)
      }
    },
    onpointerup(moved, id) {
      if (isMoveElement(layer)) {
        // 点击了空白区域
        if (!id && !moved) {
          layer.unselectElement()
        }
      }
    }
  }

  return { handler }
}
