import { Line } from '../elements'

export default function(editor) {
  const layer = editor.layer

  let line = null
  let lineProps = {}

  function reset() {
    setTimeout(() => {
      lineProps = {}
      line = null
      editor.changeAction(null)
      layer.resetEditCanvas()
    })
  }

  const controller = {
    modify(props) {
      Object.assign(lineProps, props)
    },
    save(props) {
      if (layer.elementController.hasElements()) {
        const element = layer.saveEdits(props)
        editor.record('add', element)
      }
      reset()
    },
    restore() {
      reset()
    }
  }

  const handler = {
    onpointerdown({ x, y }) {
      line = new Line(lineProps)
      line.moveTo(layer.tempCtx, ~~x, ~~y)
    },
    onpointermove({ move }) {
      layer.clearCanvas('temp')
      line.lineTo(layer.tempCtx, ~~move.x, ~~move.y)
    },
    onpointerup(moved) {
      if (!moved) {
        line.lineTo(layer.tempCtx, line.points[0] + 0.1, line.points[1] + 0.1)
      }
      layer.clearCanvas('temp')
      layer.record('add', layer.elementController.addElement(line))
      line.draw(layer.editCtx)
    }
  }
  return { controller, handler }
}
