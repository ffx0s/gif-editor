<template>
<AppView :scroll="false">
  <div class="editor" @touchmove.prevent>
    <EditorCanvas />
    <footer :class="{hide: status !== 5}">
      <EditorPlayController />
      <EditorTools />
      <EditorTextTool />
      <EditorPencilTool />
    </footer>
    <EditorDownload />
  </div>
  <Side />
  <SideBtn />
</AppView>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import editor from '@/editor/instance'

import EditorCanvas from './modules/Canvas'
import EditorPlayController from './modules/PlayController'
import EditorTools from './modules/Tools'
import EditorTextTool from './modules/TextTool'
import EditorPencilTool from './modules/PencilTool'
import EditorDownload from './modules/Download'
import Side from './modules/Side'
import SideBtn from './modules/SideBtn'

function load(to) {
  if (to.query.pic) {
    store.commit('file', to.query.pic)
  }
  // 定时器防止 UI 页面过场卡顿
  setTimeout(() => {
    store.dispatch('load')
  }, 400)
}

export default {
  name: 'cache-editor',
  computed: {
    ...mapGetters({
      status: 'status'
    })
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      load(to)
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.leave(next, () => {
      load(to)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.leave(next)
  },
  methods: {
    editorInit() {
      const vm = this

      editor.init()

      editor.layer.handler.on('onaction', type => {
        store.commit('currentAction', type)
      })

      // 监听插入、撤销、还原记录的操作
      editor.history.on('input', history => {
        // 更新对应的状态
        store.commit('undoRedostatus', [
          history.disableUndo,
          history.disableRedo
        ])
      })

      editor.gif.on('frameIndex', index => {
        store.commit('frameIndex', index)
      })

      editor.gif.on('ready', () => {
        // 解析结束并且处理完数据后显示第一帧的图片
        editor.gif.jump(0, 'absolute')
        // 设置解析结束状态
        store.commit('status', 5)
        // 设置总帧数
        store.commit('frameLength', editor.gif.frames.length)
      })

      editor.gif.parser
        .on('loadProgress', (loaded, total) => {
          store.commit('progress', {
            name: 'load',
            value: Math.ceil(loaded / total * 100)
          })
        })
        .on('parseProgress', (name, current, total) => {
          store.commit('progress', {
            name: 'parse',
            value: Math.ceil(current / total * 100)
          })
        })
        .on('loadError', () => {
          vm.$modal('加载失败，请重试或更换图片。')
          store.commit('status', 3)
        })
        .on('parseError', () => {
          vm.$modal('解析失败，请重试或更换图片。')
          store.commit('status', 4)
        })
    },
    leave(next, cb) {
      const vm = this
      if (editor.layer.hasElements()) {
        vm.$modal({
          content: '是否放弃当前的编辑？',
          confirm(instance) {
            instance.done()
            vm.$store.dispatch('reset')
            cb && cb()
            next()
          }
        })
        next(false)
      } else {
        cb && cb()
        next()
      }
    },
    destory() {}
  },
  mounted() {
    this.editorInit()
  },
  components: {
    EditorCanvas,
    EditorPlayController,
    EditorTools,
    EditorTextTool,
    EditorPencilTool,
    EditorDownload,
    Side,
    SideBtn
  }
}
</script>

<style lang="postcss">
.editor {
  position: relative;
  max-width: 750px; /*no*/
  width: 60%;
  float: left;
  height: 100%;
  background: var(--black);
  touch-action: none;
  & footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120px;
    transition: opacity 0.3s, visibility 0.3s;
    &.hide {
      opacity: 0;
      visibility: hidden;
    }
  }
}

.editor-action-border {
  position: absolute;
  top: 230px;
  left: 130px;
  z-index: 2;
  width: 80px;
  height: 40px;
  border: 1px dashed white;
  background: transparent;
  pointer-events: none;
  display: none;
  & button {
    position: absolute;
    pointer-events: auto;
    width: 28px;
    height: 28px;
    padding: 0;
    cursor: pointer;
    color: white;
    border: none;
    background: transparent;
  }
  & .zoom {
    bottom: -14px;
    right: -14px;
  }
  & i {
    margin: 0 auto;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    text-align: center;
    display: block;
    background-color: white;
    border-radius: 50%;
    color: var(--black);
  }
}
</style>


