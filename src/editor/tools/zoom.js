export default function(editor) {
  const layer = editor.layer

  let scale = null

  const handler = {
    onpointerdown() {
      scale = layer.currentElement.width / layer.currentElement.height
    },
    onpointermove({ x, y }) {
      const value = (x + y) / 2 * 1.5
      const min = 10
      let width = layer.currentElement.width + value
      let height = layer.currentElement.height + value / scale

      if (width <= min || height <= min) {
        width = layer.currentElement.width
        height = layer.currentElement.height
      }

      layer.currentElement.setProps({
        width,
        height
      })
      layer.clearCanvas('temp')
      layer.currentElement.draw(layer.tempCtx)
      layer.border.draw(layer.currentElement)
    }
  }
  return { handler }
}
