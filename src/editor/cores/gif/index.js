import EventEmitter from '@/plugins/eventEmitter'
import Parser from './parser'

export default class Gif extends EventEmitter {
  constructor() {
    super()
    this.frames = []
    this.frame = null
    this.frameOffsets = []
    this.lastImg = null
    this.disposalRestoreFromIdx = null
    this.transparency = null
    this.delay = null
    this.lastDisposalMethod = null
    this.disposalMethod = null
    this.timer = null
    this.frameIndex = -1
    this.parser = new Parser()
  }

  init() {
    const that = this

    that.create()
    ;['parseHeader', 'parseImg', 'parseGCExt', 'parseEnd'].forEach(name => {
      that.parser.on(name, data => {
        that[name](data)
      })
    })

    return that
  }

  load(url) {
    this.pause()
    this.reset()
    this.parser.load(url)
    return this
  }

  create() {
    const that = this

    that.canvas = document.createElement('canvas')
    that.ctx = that.canvas.getContext('2d')
    that.tmpCanvas = document.createElement('canvas')
    that.tmpCtx = that.tmpCanvas.getContext('2d')
  }

  render(el) {
    el.appendChild(this.canvas)
  }

  destory(el) {
    el.removeChild(this.canvas)
  }

  setFrameOffset(frame, offset) {
    if (!this.frameOffsets[frame]) {
      this.frameOffsets[frame] = offset
      return
    }
    if (typeof offset.x !== 'undefined') {
      this.frameOffsets[frame].x = offset.x
    }
    if (typeof offset.y !== 'undefined') {
      this.frameOffsets[frame].y = offset.y
    }
  }

  pushFrame() {
    if (!this.frame) return

    this.frames.push({
      data: this.frame.getImageData(
        0,
        0,
        this.header.width,
        this.header.height
      ),
      delay: this.delay
    })
    this.frameOffsets.push({ x: 0, y: 0 })
  }

  clear() {
    this.transparency = null
    this.delay = null
    this.lastDisposalMethod = this.disposalMethod
    this.disposalMethod = null
    this.frame = null
  }

  reset() {
    this.clear()
    this.frames.length = 0
    this.frameOffsets.length = 0
    this.frameIndex = -1
    this.parser.reset()
    this.ctx.clearRect(0, 0, this.tmpCanvas.width, this.tmpCanvas.height)
    this.tmpCtx.clearRect(0, 0, this.tmpCanvas.width, this.tmpCanvas.height)
  }

  setFrameIndex(index) {
    this.frameIndex = index
    this.emit('frameIndex', index)
  }

  parseHeader(header) {
    const that = this

    that.canvas.width = that.tmpCanvas.width = header.width
    that.canvas.height = that.tmpCanvas.height = header.height
    that.header = header
  }

  parseImg(img) {
    if (!this.frame) this.frame = this.tmpCanvas.getContext('2d')

    const currIdx = this.frames.length

    // ct = color table, gct = global color table
    var ct = img.lctFlag ? img.lct : this.header.gct // TODO: What if neither exists?
    /*
      Disposal method indicates the way in which the graphic is to
      be treated after being displayed.

      Values :    0 - No disposal specified. The decoder is
                      not required to take any action.
                  1 - Do not dispose. The graphic is to be left
                      in place.
                  2 - Restore to background color. The area used by the
                      graphic must be restored to the background color.
                  3 - Restore to previous. The decoder is required to
                      restore the area overwritten by the graphic with
                      what was there prior to rendering the graphic.

                      Importantly, "previous" means the frame state
                      after the last disposal of method 0, 1, or 2.
    */
    if (currIdx > 0) {
      if (this.lastDisposalMethod === 3) {
        // Restore to previous
        // If we disposed every frame including first frame up to this point, then we have
        // no composited frame to restore to. In this case, restore to background instead.
        if (this.disposalRestoreFromIdx !== null) {
          this.frame.putImageData(
            this.frames[this.disposalRestoreFromIdx].data,
            0,
            0
          )
        } else {
          this.frame.clearRect(
            this.lastImg.leftPos,
            this.lastImg.topPos,
            this.lastImg.width,
            this.lastImg.height
          )
        }
      } else {
        this.disposalRestoreFromIdx = currIdx - 1
      }

      if (this.lastDisposalMethod === 2) {
        // Restore to background color
        // Browser implementations historically restore to transparent; we do the same.
        // http://www.wizards-toolkit.org/discourse-server/viewtopic.php?f=1&t=21172#p86079
        this.frame.clearRect(
          this.lastImg.leftPos,
          this.lastImg.topPos,
          this.lastImg.width,
          this.lastImg.height
        )
      }
    }
    // else, Undefined/Do not dispose.
    // frame contains final pixel data from the last frame; do nothing

    // Get existing pixels for img region after applying disposal method
    var imgData = this.frame.getImageData(
      img.leftPos,
      img.topPos,
      img.width,
      img.height
    )
    // apply color table colors
    img.pixels.forEach((pixel, i) => {
      // imgData.data === [R,G,B,A,R,G,B,A,...]
      if (pixel !== this.transparency) {
        imgData.data[i * 4 + 0] = ct[pixel][0]
        imgData.data[i * 4 + 1] = ct[pixel][1]
        imgData.data[i * 4 + 2] = ct[pixel][2]
        imgData.data[i * 4 + 3] = 255 // Opaque.
      }
    })

    this.frame.putImageData(imgData, img.leftPos, img.topPos)

    this.lastImg = img
  }

  parseGCExt(gce) {
    this.pushFrame()
    this.clear()
    this.transparency = gce.transparencyGiven ? gce.transparencyIndex : null
    this.delay = gce.delayTime
    this.disposalMethod = gce.disposalMethod
  }

  parseEnd() {
    this.pushFrame()
    this.clear()
    this.header = null
    this.lastImg = null
    this.parser.reset()
  }

  drawFrame(index) {
    const offset = this.frameOffsets[index]

    this.tmpCtx.putImageData(this.frames[index].data, offset.x, offset.y)
    this.ctx.fillStyle = '#fff'
    this.ctx.fillRect(0, 0, this.tmpCanvas.width, this.tmpCanvas.height)
    this.ctx.drawImage(this.tmpCanvas, 0, 0)
  }

  jump(index, position) {
    this.pause()

    const endIndex = this.frames.length - 1

    if (position !== 'absolute') {
      index += this.frameIndex
    }

    if (index > endIndex) {
      index = endIndex
    } else if (index < 0) {
      index = 0
    }

    this.setFrameIndex(index)
    this.drawFrame(index)
  }

  play(loop) {
    loop = loop !== false

    this.pause()

    const endIndex = this.frames.length - 1
    let currentIndex = this.frameIndex

    if (this.frameIndex >= endIndex) {
      if (loop) {
        currentIndex = -1
      } else {
        this.pause()
        return
      }
    }

    const index = currentIndex + 1
    const delay = this.frames[index].delay * 10

    this.timer = setTimeout(() => {
      this.drawFrame(index)
      this.emit('play', index)
      this.setFrameIndex(index)

      this.play(loop)
    }, delay || 100)
  }

  pause() {
    clearTimeout(this.timer)
  }
}
