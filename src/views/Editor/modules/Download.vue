<template>
<transition name="fade">
  <div class="editor-download" v-show="status === 6 || status === 7">
    <VProgress
      class="progress"
      v-show="status === 6"
      :value="progress"
      :text="'生成中'"
    />
    <transition name="fade">
      <div class="image-container item-center" v-if="status === 7">
        <img :src="blobUrl">
        <p class="info">长按图片进行保存/鼠标右键另存为</p>
        <button class="btn-outline-info" @click="edit">继续编辑</button>
      </div>
    </transition>
  </div>
</transition>
</template>

<script>
import { mapGetters } from 'vuex'
import VProgress from '@/components/Progress'
import editor from '@/editor/instance'

export default {
  computed: {
    ...mapGetters({
      status: 'status'
    })
  },
  mounted() {
    const vm = this

    editor.gif.on('finished', blobUrl => {
      vm.blobUrl = blobUrl
      vm.$store.commit('status', 7)
    })

    editor.gif.on('progress', value => {
      vm.progress = value * 100
    })
  },
  data() {
    return {
      progress: 0,
      blobUrl: ''
    }
  },
  methods: {
    edit() {
      URL.revokeObjectURL(this.blobUrl)
      this.$store.commit('status', 5)
      this.progress = 0
      this.blobUrl = ''
    }
  },
  components: {
    VProgress
  }
}
</script>


<style lang="postcss" scoped>
.editor-download {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
  background-color: var(--black);
  & .progress {
    margin: 0 auto;
    position: absolute;
    top: 40%;
    bottom: 0;
    left: 0;
    right: 0;
    width: 80%;
  }
}
.image-container {
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: column;
  & img {
    max-width: 100%;
    max-height: 70%;
    display: block;
  }
  & .info {
    margin: 20px 0;
    color: white;
  }
}
</style>

