<template>
<div class="editor-play-controller">
  <div class="inner">
    <Range
      :value="this.frameIndex + 1"
      :min="1"
      :max="this.frameLength"
      @on-change="onChange"
      @on-dragstart="onDragstart"
    >
      <template slot="wrap">
        <IconButton class="previous" icon-class="icon-previous" @click.native="jump(-1)" :disabled="frameIndex < 1" />
        <IconButton class="next" icon-class="icon-next" @click.native="jump(1)" :disabled="frameIndex === frameLength - 1" />
      </template>
      <template slot="text"><strong>{{frameIndex + 1}}</strong>/{{frameLength}}</template>
    </Range>
  </div>
</div>
</template>

<script>
import editor from '@/editor/instance'
import { mapGetters } from 'vuex'
import Range from '@/components/Range'

export default {
  computed: {
    ...mapGetters({
      frameIndex: 'frameIndex',
      frameLength: 'frameLength'
    })
  },
  methods: {
    jump(index) {
      editor.gif.jump(index)
    },
    onChange(value) {
      editor.gif.jump(value - 1, 'absolute')
    },
    onDragstart() {
      this.$store.dispatch('pause')
    }
  },
  components: {
    Range
  }
}
</script>


<style lang="postcss" scoped>
.editor-play-controller {
  width: 100%;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  & .inner {
    margin: 0 auto;
    width: 290px;
    height: 39px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .icon-btn {
    position: absolute;
    top: -16.5px;
  }
  & >>> .iconfont {
    font-size: 18px;
  }
  & .previous {
    left: -41px;
  }
  & .next {
    right: -41px;
  }
}
</style>
