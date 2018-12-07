<template>
<EditorToolLayout
  :name="'text'"
  @on-show="onShow"
  @on-restore="restore"
  @on-save="save"
  @on-global-frame="globalFrame = !globalFrame"
>
  <ColorPicker
    :colorValue="colorValue"
    :alphaValue="alphaValue"
    @on-change-color="changeColor"
    @on-change-alpha="changeAlpha"
  />
  <div slot="action">
    <button class="btn-outline-info btn-small" @click="changeText">修改文字</button>
  </div>
</EditorToolLayout>
</template>

<script>
import editor from '@/editor/instance'
import ColorPicker from '@/components/ColorPicker'
import { colorToRGB } from '@/utils/shared'

import EditorToolLayout from './ToolLayout'

export default {
  data() {
    return {
      color: '',
      colorValue: 0,
      alphaValue: 1,
      globalFrame: true
    }
  },
  methods: {
    onShow(value) {
      if (value) {
        this.resetState()
      }
    },
    resetState() {
      this.color = ''
      this.colorValue = 0
      this.alphaValue = 1
      this.globalFrame = true
    },
    restore() {
      editor.useTool('text').restore()
    },
    save() {
      editor.useTool('text').save({
        $type: this.globalFrame ? 'global' : null
      })
    },
    modify() {
      const fillStyle = colorToRGB(this.color, this.alphaValue)
      editor.useTool('text').modify({ fillStyle })
    },
    changeColor(color, value) {
      this.colorValue = value
      this.color = color
      this.modify()
    },
    changeAlpha(value) {
      this.alphaValue = value
      this.modify()
    },
    changeText() {
      this.$textarea({
        value: editor.useTool('text').getCurrentElement().text,
        onConfirm(text) {
          if (text.trim()) {
            editor.useTool('text').modify({ text })
          }
        }
      })
    }
  },
  components: {
    EditorToolLayout,
    ColorPicker
  }
}
</script>

<style lang="postcss" scoped>
</style>


