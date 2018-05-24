import Editor from './index'

import move from './tools/move'
import zoom from './tools/zoom'
import text from './tools/text'
import pencil from './tools/pencil'

const editor = new Editor({
  el: '.editor-canvas-container'
})
  .addTool('move', move)
  .addTool('zoom', zoom)
  .addTool('text', text)
  .addTool('pencil', pencil)

export default editor
