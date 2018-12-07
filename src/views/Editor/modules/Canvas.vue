<template>
<div class="editor-canvas">
  <div class="absolute item-center">
    <!-- 上传图片 -->
    <div v-show="status === 0 || status === 3 || status === 4">
      <Upload @on-change="$store.dispatch('load')" />
      <i class="iconfont icon-upload"></i>
    </div>
    <!-- 上传、解析进度条 -->
    <VProgress
      style="width: 80%"
      class="load-progress"
      v-show="status === 2"
      :max="200"
      :value="progress.value"
      :text="progress.text"
    />
  </div>
  <div class="editor-canvas-container"></div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Upload from '@/components/Upload'
import VProgress from '@/components/Progress'

export default {
  computed: {
    ...mapGetters({
      status: 'status',
      loadProgress: 'loadProgress',
      parseProgress: 'parseProgress'
    }),
    progress() {
      return {
        value: this.loadProgress + this.parseProgress,
        text: this.loadProgress !== 100 ? '加载中' : '解析中'
      }
    }
  },
  components: {
    Upload,
    VProgress
  }
}
</script>

<style lang="postcss">
.editor-canvas {
  position: absolute;
  top: 0;
  bottom: 130px;
  left: 0;
  right: 0;
  width: 100%;
  & .editor-canvas-box {
    position: relative;
    width: 100%;
    height: 100%;
  }
  /*flex垂直居中在IOS9子元素有absolute属性时失效，采用这种方式居中：*/
  & canvas {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    z-index: 1;
    pointer-events: none;
  }
  & .absolute {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  & .icon-upload {
    font-size: 60px;
    color: white;
  }
  & .load-progress {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
