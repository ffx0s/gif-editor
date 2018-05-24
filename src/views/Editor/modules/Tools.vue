<template>
<div class="editor-tools" @click="$store.dispatch('pause')">
  <scroll-view style="width: 75%" scrollX>
    <div class="list">
      <icon-button class="newfile" :icon-class="'icon-new'" @click.native="createNewFile" />
      <icon-button icon-class="icon-pencil" @click.native="usePencilTool" />
      <icon-button icon-class="icon-ico-typelayer-ZIpQl" @click.native="useTextTool" />
      <icon-button :icon-class="pause ? 'icon-play' :'icon-pause'" @click.native.stop="play" />
      <icon-button icon-class="icon-download" @click.native="createGif" />
      <!-- <icon-button icon-class="icon-delete" /> -->
    </div>
  </scroll-view>
  <div class="list undo">
    <icon-button icon-class="icon-undo" @click.native="undo" :disabled="disableUndo" />
    <icon-button icon-class="icon-redo" @click.native="redo" :disabled="disableRedo" />
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import editor from '@/editor/instance'
import ScrollView from '@/components/ScrollView'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      pause: 'pause',
      disableUndo: 'disableUndo',
      disableRedo: 'disableRedo'
    })
  },
  methods: {
    play() {
      this.$store.dispatch(this.pause ? 'play' : 'pause')
    },
    undo() {
      editor.history.undo(editor)
    },
    redo() {
      editor.history.redo(editor)
    },
    useTextTool() {
      this.$textarea({
        onConfirm(text) {
          if (text.trim()) {
            editor.useTool('text').add({ text })
          }
        }
      })
    },
    usePencilTool() {
      editor.useTool('pencil')
    },
    createNewFile() {
      const vm = this

      vm.$confirm({
        body: '是否放弃当前编辑，上传新的图片？',
        confirm() {
          vm.$store.dispatch('reset')
        }
      })
    },
    createGif() {
      editor.createGif()
      this.$store.commit('status', 6)
    }
  },
  components: {
    ScrollView
  }
}
</script>

<style lang="postcss">
.editor-tools {
  position: absolute;
  bottom: 10px;
  width: 100%;
  height: 40px;
  & .list {
    height: 40px;
    line-height: 40px;
    font-size: 0;
  }
  & .iconfont {
    font-size: 20px;
  }
  & .icon-btn {
    margin-right: 10px;
    box-sizing: content-box;
  }
  & .icon-delete {
    font-size: 22px;
  }
  & .newfile {
    transform: translate(0, -2px);
  }
  & .icon-new {
    font-size: 16px;
    font-weight: bold;
  }
  & .icon-play {
    position: relative;
    top: -1.5px;
  }
  & .undo {
    position: absolute;
    top: 0;
    right: 0;
    width: 84px;
    height: 100%;
    text-align: right;
    & button:last-child {
      margin-right: 0;
    }
  }
}
</style>
