// Generic functions
export function bitsToNum(ba) {
  return ba.reduce(function(s, n) {
    return s * 2 + n
  }, 0)
}

export function byteToBitArr(bite) {
  const a = []
  for (let i = 7; i >= 0; i--) {
    a.push(!!(bite & (1 << i)))
  }
  return a
}

export function lzwDecode(minCodeSize, data) {
  // TODO: Now that the GIF parser is a bit different, maybe this should get an array of bytes instead of a String?
  var pos = 0 // Maybe this streaming thing should be merged with the Stream?
  var readCode = function(size) {
    var code = 0
    for (var i = 0; i < size; i++) {
      if (data.charCodeAt(pos >> 3) & (1 << (pos & 7))) {
        code |= 1 << i
      }
      pos++
    }
    return code
  }

  var output = []

  var clearCode = 1 << minCodeSize
  var eoiCode = clearCode + 1

  var codeSize = minCodeSize + 1

  var dict = []

  var clear = function() {
    dict = []
    codeSize = minCodeSize + 1
    for (var i = 0; i < clearCode; i++) {
      dict[i] = [i]
    }
    dict[clearCode] = []
    dict[eoiCode] = null
  }

  var code
  var last
  var flag = true

  while (flag) {
    last = code
    code = readCode(codeSize)

    if (code === clearCode) {
      clear()
      continue
    }
    if (code === eoiCode) break

    if (code < dict.length) {
      if (last !== clearCode) {
        dict.push(dict[last].concat(dict[code][0]))
      }
    } else {
      if (code !== dict.length) throw new Error('Invalid LZW code.')
      dict.push(dict[last].concat(dict[last][0]))
    }
    output.push.apply(output, dict[code])

    if (dict.length === 1 << codeSize && codeSize < 12) {
      // If we're at the last code and codeSize is 12, the next code will be a clearCode, and it'll be 12 bits long.
      codeSize++
    }
  }

  // I don't know if this is technically an error, but some GIFs do it.
  // if (Math.ceil(pos / 8) !== data.length) throw new Error('Extraneous LZW bytes.');
  return output
}

export function deinterlace(pixels, width) {
  // Of course this defeats the purpose of interlacing. And it's *probably*
  // the least efficient way it's ever been implemented. But nevertheless...
  var newPixels = new Array(pixels.length)
  var rows = pixels.length / width
  var cpRow = function(toRow, fromRow) {
    var fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width)
    newPixels.splice.apply(newPixels, [toRow * width, width].concat(fromPixels))
  }

  // See appendix E.
  var offsets = [0, 4, 2, 1]
  var steps = [8, 8, 4, 2]

  var fromRow = 0
  for (var pass = 0; pass < 4; pass++) {
    for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
      cpRow(toRow, fromRow)
      fromRow++
    }
  }

  return newPixels
}

export function fileToArrayBuffer(file, callback, errorCallback) {
  const fileReader = new window.FileReader()

  fileReader.onload = e => {
    callback(e.target.result)
  }
  fileReader.onerror = errorCallback || function() {}

  fileReader.readAsArrayBuffer(file)
}

export const isBase64Image = src => src.indexOf(';base64,') > 0

export function toImageObj (target) {
  const image = new Image()

  if (target instanceof Blob || target instanceof File) {
    target = URL.createObjectURL(target)
  }

  if (!isBase64Image(target)) {
    image.crossOrigin = '*'
  }

  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve(image)
      URL.revokeObjectURL(target)
    }
    image.onerror = reject
    image.src = target
  })
}
