<template>
<EditorToolLayout
  :name="'pencil'"
  :enabledRecord="true"
  @on-show="onShow"
  @on-restore="restore"
  @on-save="save"
  @on-global-frame="globalFrame = !globalFrame"
  @click.native="showMenu = false"
>
  <ColorPicker
    :colorValue="colorValue"
    :alphaValue="alphaValue"
    @on-change-color="changeColor"
    @on-change-alpha="changeAlpha"
  />
  <div slot="action">
    <div class="size" @click.stop="showMenu = !showMenu">
      <i
        :style="{backgroundColor: strokeStyle }"
        :class="'current ' + sizeClass"
      >
      </i>
      <transition name="fade">
        <ul v-show="showMenu">
          <li @click="changeSize(item)" v-for="item in sizeList" :key="item.size">
            <i :class="item.name" :style="{backgroundColor: strokeStyle }"></i>
          </li>
        </ul>
      </transition>
    </div>
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
      globalFrame: true,
      showMenu: false,
      sizeClass: 'small',
      sizeList: [
        { name: 'huge', size: 12 },
        { name: 'large', size: 9 },
        { name: 'middle', size: 6 },
        { name: 'small', size: 2 }
      ],
      strokeStyle: '#000'
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
      this.strokeStyle = '#000'
      this.sizeClass = 'small'
    },
    restore() {
      editor.useTool('pencil').restore()
    },
    save() {
      editor.useTool('pencil').save({
        $type: this.globalFrame ? 'global' : null
      })
    },
    modify() {
      const strokeStyle = colorToRGB(this.color, this.alphaValue)
      this.strokeStyle = strokeStyle
      editor.useTool('pencil').modify({ strokeStyle })
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
    changeSize(item) {
      this.sizeClass = item.name
      editor.useTool('pencil').modify({ lineWidth: item.size })
    }
  },
  components: {
    EditorToolLayout,
    ColorPicker
  }
}
</script>

<style lang="postcss" scoped>
.size {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
  & i {
    margin: 0 auto;
    display: block;
    border-radius: 50%;
    background-color: var(--black);
    box-shadow: 0px 0px 2px 1px #9e9e9e;
  }
  & .huge {
    width: 16px;
    height: 16px;
  }
  & .large {
    width: 12px;
    height: 12px;
  }
  & .middle {
    width: 8px;
    height: 8px;
  }
  & .small {
    width: 4px;
    height: 4px;
  }
  & ul {
    position: absolute;
    width: 100%;
    top: -72px;
    background: rgba(255, 255, 255, 0.9);
    & li {
      width: 100%;
      height: 25px;
      display: flex;
      align-items: center;
    }
  }
}
</style>


